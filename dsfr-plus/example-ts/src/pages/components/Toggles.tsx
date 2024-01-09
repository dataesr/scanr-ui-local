import { useState } from 'react';
import { Toggle, Fieldset, Breadcrumb, Container, Title, Text, Row, Col, Link } from '@dataesr/react-dsfr';
import Playground from '../../components/Playground';

const toggle = `
<Toggle label="Vrai ou faux ?"/>
`;
const toggleGroup = `
<Fieldset>
  <Toggle hasSeparator label="Vrai ou faux ?" hint="Telle est la question." />
  <Toggle hasSeparator label="Vrai ou faux ?" hint="Telle est la question." />
  <Toggle hasSeparator label="Vrai ou faux ?" hint="Telle est la question." />
</Fieldset>
`;

const toggleGroupLeft = `
<Fieldset>
  <Toggle hasLabelLeft hasSeparator label="Vrai ou faux ?" hint="Telle est la question." />
  <Toggle hasLabelLeft hasSeparator label="Vrai ou faux ?" hint="Telle est la question." />
  <Toggle hasLabelLeft hasSeparator label="Vrai ou faux ?" hint="Telle est la question." />
</Fieldset>
`;

const toggleGroupControlled = `
() => {
  const [checked, setChecked] = useState(false);
  return (
    <Fieldset>

    <Toggle
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      name="existentiel"
      label="Vrai ou faux ?"
      hint="Telle est la question."
    />
    </Fieldset>

  )
}
`;

export function Toggles() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link>Interrupteur - Toggle</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Interrupteur - Toggle</Title>
          <Text>
            Le composant `Interrupteur` permet à l’utilisateur de faire un choix entre
            deux états opposés (activé / désactivé).
          </Text>
          <Text>
            L’usage des interrupteurs est à privilégier pour paramétrer des fonctionnalités
            transverses (exemple : activation / désactivation des cookies) Le changement
            d'état de l’interrupteur a un effet immédiat (il ne nécessite pas de validation).
          </Text>
          <Playground code={toggle} scope={{ Toggle, Fieldset }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Groupe d'interrupteurs</Title>
          <Text>
            Afin de gérer l'espacement lorsque plusieurs interrupteurs sont acollés, il est recommandé d'utiliser le composant `ToggleGroup`
            Vous pouvez séparer les interrupteus avec la propriété `hasSeparator`.
          </Text>
          <Playground code={toggleGroup} scope={{ Toggle, Fieldset }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Interrupteur controlé</Title>
          <Text>
            Utilisez le composant comme un composant input de type checkbox.
          </Text>
          <Playground code={toggleGroupControlled} scope={{ Toggle, useState, Fieldset }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Interrupteur avec label à gauche</Title>
          <Text>
            Utilisez le composant comme un composant input de type checkbox.
          </Text>
          <Playground code={toggleGroupLeft} scope={{ Toggle, Fieldset }} defaultShowCode />
        </Col>
      </Row>
    </Container>
  )
}