import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  Container,
  Link,
  Notice,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import PageSkeleton from "../../../components/skeleton/page-skeleton";
import OrganizationPresentation from "./components/organization";
import { getOrganizationById } from "../../../api/organizations/[id]";
import getLangFieldValue from "../../../utils/lang";
import { RawIntlProvider, createIntl } from "react-intl";

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

export default function Organization() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["organizations", id],
    queryFn: () => getOrganizationById(id),
    throwOnError: true,
  });
  return (
    <RawIntlProvider value={intl}>
      {!data?.isFrench && (
        <Notice closeMode="disallow" type="warning">
          {intl.formatMessage({ id: "organizations.notice.not-french" })}
        </Notice>
      )}
      {data?.endDate && (
        <Notice closeMode="disallow" type="warning">
          {intl.formatMessage({ id: "organizations.notice.closed" })}{" "}
          {data.endDate.slice(0, 4)}.
        </Notice>
      )}
      <Container>
        <Breadcrumb>
          <Link href="/">
            {intl.formatMessage({ id: "organizations.breadcrumb.home" })}
          </Link>
          <Link href="/search/organizations">
            {intl.formatMessage({ id: "organizations.breadcrumb.search" })}
          </Link>
          <Link>{getLangFieldValue(locale)(data?.label)}</Link>
        </Breadcrumb>
        {(isLoading || !data?.id) && <PageSkeleton />}
        {data?.id && <OrganizationPresentation data={data} />}
      </Container>
    </RawIntlProvider>
  );
}
