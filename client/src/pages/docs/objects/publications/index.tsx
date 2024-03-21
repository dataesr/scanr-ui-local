import { Container, Text, Title } from '@dataesr/dsfr-plus';
import publicationDocs from '../../../../../../docs/scanr_publications.json';
import { Fields, Model } from '../components/model';


export default function PublicationsDocs() {
  return (
    <Container className="fr-mb-8w">
      <Title as="h1" look="h3">Publications</Title>
      <Text>
        This page describes the fields of the <code>publications</code> resource of the ScanR API.
      </Text>
      <Model fields={publicationDocs?.fields as unknown as Fields} />
    </Container>
  );
}