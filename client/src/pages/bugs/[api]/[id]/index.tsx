import {
  Breadcrumb,
  Col,
  Container,
  Link,
  Row,
  Title,
  Text,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import ContactForm from "../../../../components/contact-form";
import { RawIntlProvider, createIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { getOrganizationById } from "../../../../api/organizations/[id]";
import { getProjectById } from "../../../../api/projects/[id]";
import { getPublicationById } from "../../../../api/publications/[id]";
import { getAuthorById } from "../../../../api/authors/[id]";
import { getPatentById } from "../../../../api/patents/[id]";
import { useQuery } from "@tanstack/react-query";
import getLangFieldValue from "../../../../utils/lang";

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

const API_MAPPING = {
  organizations: "structures",
  projects: "projects",
  publications: "publications",
  authors: "persons",
  patents: "productions",
  networks: "network",
}

const API_LABEL_KEY = {
  organizations: ["label", true],
  projects: ["label", true],
  publications: ["title", true],
  authors: ["fullName", false],
  patents: ["title", true],
  networks: ["title", true],
}

const API_GETTERS = {
  organizations: getOrganizationById,
  projects: getProjectById,
  publications: getPublicationById,
  authors: getAuthorById,
  patents: getPatentById,
  networks: (id: string) => ({ id: id.replace(/"/g, '\\"'), title: { fr: "Réseau", default: "Network" } }),
}

export default function BugsReport() {
  const { locale } = useDSFRConfig()
  const { api, id } = useParams()
  const intl = createIntl({ locale, messages: messages[locale] })
  const queryFn = API_GETTERS?.[api]
  const { data } = useQuery({
    queryKey: [api.slice(0, -1), id],
    queryFn: () => queryFn(id),
    throwOnError: true,
  })
  const [displayNameKey, isLangField] = API_LABEL_KEY[api]
  if (!messages) return null

  console.log("api", api.slice(0, -1), id, data)

  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb>
          <Link href="/">{intl.formatMessage({ id: "contribute.breadcrumb.home" })}</Link>
          <Link>{intl.formatMessage({ id: "contribute.breadcrumb.page" })}</Link>
        </Breadcrumb>
        <Title as="h1" look="h3">
          {intl.formatMessage({ id: "contribute.title" })}
        </Title>
        <Text>
          <span className="fr-text--sm">{intl.formatMessage({ id: "contribute.description" })}</span>
          <br />
          <em className="fr-text--bold">
            {isLangField ? getLangFieldValue(locale)(data?.[displayNameKey]) : data?.[displayNameKey]}
          </em>
          <br />
          <em className="fr-text-mention--grey">{data?.id}</em>
        </Text>
        <Row>
          <Col xs={12} lg={7}>
            <ContactForm objectId={id} objectType={API_MAPPING?.[api]} />
          </Col>
        </Row>
      </Container>
    </RawIntlProvider>
  )
}
