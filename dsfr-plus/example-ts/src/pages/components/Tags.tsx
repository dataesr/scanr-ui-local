import { Breadcrumb, Container, Tag, TagGroup, SelectableTag, DissmissibleTag, Title, Text, Row, Col, Link } from '@dataesr/react-dsfr';
import Playground from '../../components/Playground';

const tag = `
<TagGroup>
  <Tag color="green-emeraude">Tag</Tag>
  <Tag color="green-emeraude" as="a" href="#">Tag</Tag>
  <DissmissibleTag color="green-emeraude" onClick={() => {}}>Tag</DissmissibleTag>
  <SelectableTag selected={true} color="green-emeraude" onClick={() => {}}>Tag</SelectableTag>
</TagGroup>
`;

export function Tags() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link>Tag - Tag</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Tag - Tag</Title>
          <Text>
            Le fil d’Ariane est un système de navigation secondaire qui permet à l’utilisateur de se situer sur le site qu’il consulte.
            Le fil d’Ariane donne des informations sur l’architecture du site.
            Il indique à l’utilisateur sa position courante et lui permet de se repérer dans l’arborescence du site.
            Le fil d’Ariane est présent sur l’ensemble des pages à l’exception de la page d'accueil.
            Sa position dans la page doit toujours être la même, de préférence entre le header et le contenu principal de la page.
            L’ensemble de ses éléments sont cliquables, à l’exception de la page consultée.
          </Text>
          <Text>
            Pour utiliser le fil d'Ariane, wrappez simplement des composants Link dans un composant Breadcrumb.
            Le dernier élément doit coorespondre à la page actuelle et n'est pas cliquable.
          </Text>
          <Playground code={tag} scope={{ Tag, TagGroup, SelectableTag, DissmissibleTag }} defaultShowCode />
        </Col>
      </Row>
    </Container>
  )
}