import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Container, Link, useDSFRConfig } from "@dataesr/dsfr-plus";
import { RawIntlProvider, createIntl } from "react-intl";
import { getAuthorById } from "../../../api/authors/[id]";
import AuthorPresentation from "./components/author";
import PageSkeleton from "../../../components/skeleton/page-skeleton";

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })

const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});


export default function Author() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] })
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["author", id],
    queryFn: () => getAuthorById(id),
    throwOnError: true,
  });
  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb>
          <Link href="/">
            {intl.formatMessage({ id: "authors.breadcrumb.home" })}
          </Link>
          <Link href="/search/authors">
            {intl.formatMessage({ id: "authors.breadcrumb.search" })}
          </Link>
          <Link>
            {data?.fullName}
          </Link>
        </Breadcrumb>
        {(isLoading || !data) && <PageSkeleton />}
        {(data?.id) && <AuthorPresentation data={data} />}
      </Container>
    </RawIntlProvider>
  )
}