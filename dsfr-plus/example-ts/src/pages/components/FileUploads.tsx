import { FileUpload, Breadcrumb, Container, Title, Text, Row, Col, Link } from '@dataesr/react-dsfr';
import Playground from '../../components/Playground';

const fileUpload = `
<FileUpload
  label="Ajouter votre CV"
  hint="Au format pdf uniquement, taille maximal 1Mo."
/>
`;
const fileUploadError = `
<FileUpload
  errorMessage="Votre fichier n'est pas au format pdf."
  label="Ajouter votre CV"
  hint="Au format pdf uniquement, taille maximal 1Mo."
/>
`;
const fileUploadDisabled = `
<FileUpload
  disabled
  label="Ajouter votre CV"
  hint="Au format pdf uniquement, taille maximal 1Mo."
/>
`;

export function FileUploads() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link>Ajout de fichier - FileUpload</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Ajout de fichier - FileUpload</Title>
          <Text>
            Ce composant permet aux utilisateurs de sélectionner et envoyer un ou plusieurs fichiers.
          </Text>
          <Text>
            Il s'utilise comme une balise `input` de type 'file'.
            Ajoutez la propriété `multiple` pour permettre l'envoi de plusieurs fichiers.
          </Text>
          <Text as="span">
            Le composant `FileUpload` est composé :
            <ul>
              <li>
                d'un label - le texte du label exprime clairement l’action attendu pour l’utilisateur, par défaut : “Ajouter un fichier”
              </li>
              <li>
                d'un texte explicatif qui précise les contraintes au niveau du ou des fichiers attendus : format, poids attendus, nombre de fichiers possible…
              </li>
              <li>
                d'un bouton “parcourir” et le texte des fichiers qui sont gérés en natif directement par le navigateur
              </li>
            </ul>
          </Text>
          <Playground code={fileUpload} scope={{ FileUpload }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Message d'erreur</Title>
          <Text>
            Vous pouvez ajouter un message d'erreur avec la propriété `errorMessage`.
          </Text>
          <Playground code={fileUploadError} scope={{ FileUpload }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Désactivé</Title>
          <Playground code={fileUploadDisabled} scope={{ FileUpload }} defaultShowCode />
        </Col>
      </Row>
    </Container>
  )
}