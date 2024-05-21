import { Container, Text, Title } from "@dataesr/dsfr-plus";
import schema from "../../../../../../docs/scanr_organizations.json";
import SchemaDocumentation from "../components/schema-documentation";

export default function OrganizationsDocs() {
  return (
    <Container className="fr-mb-8w">
      <Title as="h1" look="h3">
        Organizations
      </Title>
      <Text>
        This page describes the fields of the <code>projects</code> resource of
        the ScanR API.
      </Text>
      <SchemaDocumentation schema={schema} />
    </Container>
  );
}
