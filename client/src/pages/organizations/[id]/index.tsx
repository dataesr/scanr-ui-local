import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Container, Link, useDSFRConfig } from "@dataesr/dsfr-plus";
import OrganizationSkeleton from "./components/skeleton";
import OrganizationPresentation from "./components/organization";
import { getOrganizationById } from "../../../api/organizations";
import getLangFieldValue from "../../../utils/lang";
import { FormattedMessage, RawIntlProvider, createIntl } from "react-intl";

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })

const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});


export default function Organization() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] })
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["organization", id],
    queryFn: () => getOrganizationById(id),
    throwOnError: true,
  });
  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb>
          <Link href="/">
            <FormattedMessage id="organizations.breadcrumb.home" />
          </Link>
          <Link href="/search/organizations">
            <FormattedMessage id="organizations.breadcrumb.search" />
          </Link>
          <Link>
            {getLangFieldValue(locale)(data?.label)}
          </Link>
        </Breadcrumb>
        {(isLoading || !data?.id) && <OrganizationSkeleton />}
        {(data?.id) && <OrganizationPresentation data={data} />}
      </Container>
    </RawIntlProvider>
  )
}