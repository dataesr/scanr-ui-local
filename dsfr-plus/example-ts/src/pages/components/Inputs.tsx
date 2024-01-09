import { Breadcrumb, Link, TextInput, TextArea, Container, Col, Row, Title, Text } from '@dataesr/react-dsfr';
import { useState } from 'react';
import Playground from '../../components/Playground';

const uncontrolled = `
<TextInput label="Nom" />
`

const states = `
<>
  <TextInput
    label="Nom"
    messageType="error"
    message="Votre message d'erreur"
  />
  <TextInput
    label="Nom"
    messageType="valid"
    message="Votre message de succès"
  />
</>
`

const disabled = `
<TextInput disabled label="Nom" />
`

const icon = `
<TextInput label="Nom" icon="user-line" />
`

const hint = `
<TextInput label="Nom" hint="Entrez votre nom de famille" />
`

const textarea = `
<TextArea
  label="Commentaire"
  hint="Zone de texte libre"
/>
`

const controlled = `
() => {
  const [value, setValue] = useState('');
  return (
    <TextInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Nom"
      hint="Entrez votre nom de famille"
      icon="alert-line"
    />
  );
}
`

const autoValidation = `
<TextInput
  label="Nom" hint="Entrez moins de 5 caractères pour afficher l'erreur"
  minLength={5}
  required
/>
`
const autoValidationDisabled = `
<TextInput
  label="Nom"
  hint="Entrez moins de 5 caractères. L'erreur ne s'affiche pas"
  minLength={5}
  required
  disableAutoValidation
/>
`

export function Inputs() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link aria-current="page">Champ de saisie - TextInput</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Champ de saisie - TextInput</Title>
          <Text>
            Les champs permettent à un utilisateur d'entrer du contenu et données.
            Le champ simple est un champ de saisie libre, qui accepte une courte ligne de contenu (texte ou/ et nombre).
            Le libellé se trouve au-dessus du champs de saisie, pour faciliter la lecture.
          </Text>
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">État par défaut</Title>
          <Playground code={uncontrolled} scope={{ TextInput }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">États erreur et succès</Title>
          <Playground code={states} scope={{ TextInput }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">États désactivé</Title>
          <Playground code={disabled} scope={{ TextInput }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Champ avec texte d’aide</Title>
          <Text>Le DSFR recommande d’ajouter un texte d’aide sous le libellé afin de faciliter la saisie. </Text>
          <Playground code={hint} scope={{ TextInput }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Utilisation avec une icône</Title>
          <Playground code={icon} scope={{ TextInput }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Zone de texte - textarea</Title>
          <Text>
            Le champs “zone de texte” est un champ de saisie libre, qui accepte plus d’une ligne de contenu (texte ou/ et nombre).
            Il reprend le style du champ simple et augmente uniquement sa hauteur.
          </Text>
          <Playground code={textarea} scope={{ TextArea }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Utilisation en mode controlé</Title>
          <Text>
            Le composant Champ de saisie est un élément <code>TextInput</code> classique.
            Vous pouvez gérer le champs de saisie depuis votre composant en utilisant <code>value</code> et <code>onChange</code>.
          </Text>
          <Playground code={controlled} scope={{ TextInput, useState }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Contrôle de l'état `valid` et `error`</Title>
          <Text>
            Si vous n'utilisez pas les paramètres d'état <code>message</code> et <code>messageType</code>,
            la validation automatique du navigateur est utilisée.
          </Text>
          <Playground code={autoValidation} scope={{ TextInput }} />
          <Text>
            Vous pouvez la rendre inopérante avec la props <code>disableAutoValidation</code>.
          </Text>
          <Playground code={autoValidationDisabled} scope={{ TextInput }} />
        </Col>
      </Row>
    </Container>
  )
}