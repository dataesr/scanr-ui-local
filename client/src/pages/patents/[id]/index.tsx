import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Container, Link, useDSFRConfig } from "@dataesr/dsfr-plus";
import { RawIntlProvider, createIntl } from "react-intl";
import { getPatentById } from "../../../api/patents/[id]";
import PatentPage from "./components/patents";
import PageSkeleton from "../../../components/skeleton/page-skeleton";
import getLangFieldValue from "../../../utils/lang";
import BaseSkeleton from "../../../components/skeleton/base-skeleton";

const modules = import.meta.glob("./locales/*.json", {
  eager: true,
  import: "default",
});

const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] };
  }
  return acc;
}, {});

export default function Patents() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["patent", id],
    queryFn: () => getPatentById(id),
    throwOnError: true,
  });
  const title = getLangFieldValue(locale)(data?.title);
  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb>
          <Link href="/">
            {intl.formatMessage({ id: "patents.breadcrumb.home" })}
          </Link>
          <Link href="/search/patents">
            {intl.formatMessage({ id: "patents.breadcrumb.search" })}
          </Link>
          <Link>
            {title?.slice(0, 80)}
            {title?.length > 80 ? " ..." : ""}
            {!title && <BaseSkeleton width="180px" height="1rem" />}
          </Link>
        </Breadcrumb>
        {isLoading || !data ? <PageSkeleton /> : <PatentPage data={data} />}
      </Container>
    </RawIntlProvider>
  );
}
