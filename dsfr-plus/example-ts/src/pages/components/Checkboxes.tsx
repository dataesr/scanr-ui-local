import { Checkbox, Fieldset, Container, Title, Text, Row, Col, Breadcrumb, Link } from '@dataesr/react-dsfr';
import Playground from '../../components/Playground';

const checkboxSimple = `
<Checkbox value="1" name="checker" label="Checkbox 1" />
`;
const checkboxDefaultSimple = `
<Checkbox defaultChecked value="1" name="checker" label="Checkbox 1" />
`;

const state = `
<Fieldset
  hint="Moi je suis en succès"
  messageType="valid"
  message="Bien joué !"
  legend="Un groupe de boutons Checkbox"
>
  <Checkbox defaultChecked value="1" name="checker" label="Checkbox 1" />
  <Checkbox value="2" name="checker" label="Checkbox 2" />
  <Checkbox value="3" name="checker" label="Checkbox 3" />
</Fieldset>
`;

const disabled = `
<Fieldset
  disabled
  hint="Je ne suis pas cliquable"
  legend="Un groupe de boutons Checkbox"
>
  <Checkbox value="1" name="checker" label="Checkbox 1" />
  <Checkbox value="2" name="checker" label="Checkbox 2" />
  <Checkbox value="3" name="checker" label="Checkbox 3" />
</Fieldset>
`;

const hint = `
<Fieldset
  hint="Texte d'explication pour tout le champ"
  legend="Un groupe de boutons Checkbox"
>
  <Checkbox
    hint="Je suis la valeur numéro 1"
    value="1"
    name="checker"
    label="Checkbox 1" />
  <Checkbox
    hint="Je suis la valeur numéro 2"
    value="2"
    name="checker"
    label="Checkbox 2" />
  <Checkbox
    hint="Je suis la valeur numéro 3"
    value="3"
    name="checker"
    label="Checkbox 3" />
</Fieldset>
`;

const inline = `
<Fieldset isInline hint="Je suis en ligne" legend="Un groupe de boutons Checkbox">
  <Checkbox 
    hint="Je suis la valeur numéro 1"
    value="1"
    name="checker"
    label="Checkbox 1"
  />
  <Checkbox 
    hint="Je suis la valeur numéro 2"
    value="2"
    name="checker"
    label="Checkbox 2"
  />
  <Checkbox 
    hint="Je suis la valeur numéro 3"
    value="3"
    name="checker"
    label="Checkbox 3"
  />
</Fieldset>
`;
const checkboxGroup = `
<Fieldset legend="Un groupe de boutons Checkbox">
  <Checkbox
    value="1"
    name="checker"
    label="Checkbox 1"
  />
  <Checkbox
    value="2"
    name="checker"
    label="Checkbox 2"
  />
  <Checkbox
    value="3"
    name="checker"
    label="Checkbox 3"
  />
</Fieldset>
`;
const checkboxGroupSM = `
<Fieldset isInline legend="Un groupe de boutons Checkbox">
  <Checkbox
    size="sm"
    value="1"
    name="checker"
    label="Checkbox 1"
  />
  <Checkbox
    size="sm"
    value="2"
    name="checker"
    label="Checkbox 2"
  />
  <Checkbox
    size="sm"
    value="3"
    name="checker"
    label="Checkbox 3"
  />
</Fieldset>
`;

export function Checkboxes() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Fieldset
          hint="Moi je suis en succès"
          messageType="valid"
          message="Bien joué !"
          legend="Un groupe de boutons Checkbox"
        >
          <Checkbox value="1" name="checker" label="Checkbox 1" defaultChecked />
          <Checkbox value="2" name="checker" label="Checkbox 2" />
          <Checkbox value="3" name="checker" label="Checkbox 3" />
        </Fieldset>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link aria-current="page">Case à cocher - Checkbox</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Case à cocher - Checkbox</Title>
          <Text>
            Les cases à cocher permettent à l’utilisateur de sélectionner une ou plusieurs options dans une liste.
            Elles sont utilisées pour effectuer des sélections multiples (de 0 à N éléments) ou bien pour permettre
            un choix binaire, lorsque l’utilisateur peut sélectionner ou désélectionner une seule option.
          </Text>
          <Text>
            La case à cocher peut être utilisée seule ou en liste.
            Évitez les listes de plus de 5 éléments et lorsque vous souhaitez contraindre
            le choix à un seul élément - utilisez les boutons radio.
          </Text>
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Bouton Checkbox simple</Title>
          <Playground code={checkboxSimple} scope={{ Checkbox }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Checkbox - État cochée par défaut</Title>
          <Playground code={checkboxDefaultSimple} scope={{ Checkbox }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Groupe de boutons Checkbox</Title>
          <Text>
            Comme pour le composant Checkbox, plusieurs boutons Checkbox sont
            regroupés sous un composant `Fieldset`, qui permet de gérer la
            légende ainsi que l'erreur sur le champ.
          </Text>
          <Playground code={checkboxGroup} scope={{ Checkbox, Fieldset }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Gestion de l'état</Title>
          <Text>
            Vous devez gérer l'état du champ directement dans le composant `Fieldset` :
          </Text>
          <Playground code={state} scope={{ Checkbox, Fieldset }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Avec des textes d'explication</Title>
          <Text>
            Vous pouvez ajouter des textes explicatifs dans chaque bouton Checkbox et dans le Fieldset :
          </Text>
          <Playground code={hint} scope={{ Checkbox, Fieldset }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Désactivé</Title>
          <Text>
            Appliquez simplement l'attribut `disabled` sur le Fieldset :
          </Text>
          <Playground code={disabled} scope={{ Checkbox, Fieldset }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">En ligne</Title>
          <Text>
            Vous pouvez ajouter la propriété `isInline` pour afficher les boutons Checkbox sur une ligne.
          </Text>
          <Playground code={inline} scope={{ Checkbox, Fieldset }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">En taille "sm"</Title>
          <Text>
            Vous pouvez réduire la taille des checkboxes avec l'option `size`.
          </Text>
          <Playground code={checkboxGroupSM} scope={{ Checkbox, Fieldset }} />
        </Col>
      </Row>
    </Container>
  );
}