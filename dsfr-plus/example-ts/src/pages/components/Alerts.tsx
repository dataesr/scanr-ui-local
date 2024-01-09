import { Alert, Container, Row, Col, Breadcrumb, Link, Text, Title } from '@dataesr/react-dsfr';
import { useState } from 'react';
import Playground from '../../components/Playground';

const alert = `
<Alert title="Alerte" description="Ceci est une alerte"/>
`
const smallAlert = `
<>
  <Alert size="sm" description="Ceci est une alerte"/>
  <Alert size="sm" title="Alert" description="Ceci est une alerte"/>
</>
`
const variants = `
<>
  <Alert variant="info" title="Alerte" description="info" />
  <Alert variant="warning" title="Alerte" description="Attention" />
  <Alert variant="error" title="Alerte" description="Erreur" />
  <Alert variant="success" title="Alerte" description="Succès" />
</>
`
const closeModeControlled = `
() => {
  const [display, setDisplay] = useState(true);
  return (
    <>
    {display && <Alert title="Alerte fermeture controllée" description="T'es sur ?" closeMode="controlled" onClose={() => console.log('closed')} />}
    {display && <Alert titleAs="h5" title="Alerte" description="Si si, suffit de demander" closeMode="controlled" onClose={() => setDisplay(false)} />}
    </>
  ) 
}
`
const closeModeUncontrolled = `
<Alert
  title="Alerte fermeture non controllée"
  description="T'es sur ? Ben oui j'suis sur."
  closeMode="uncontrolled"
/>
`

export function Alerts() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link aria-current="page">Alerte - Alert</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Alerte - Alert</Title>
          <Text>
            Les alertes permettent d’attirer l’attention de l’utilisateur sur une information sans interrompre sa tâche en cours.
          </Text>
          <Playground code={alert} scope={{ Alert }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Variantes</Title>
          <Playground code={variants} scope={{ Alert }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Mode de fermeture</Title>
          <Text>
            La fermeture peut être controllée
          </Text>
          <Playground code={closeModeControlled} scope={{ Alert, useState }} />
          <Text>
            ... ou non controllée.
          </Text>
          <Playground code={closeModeUncontrolled} scope={{ Alert }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Taille SM</Title>
          <Text>
            Vous pouvez réduire les marges intérieurs avec la propriété `size="sm"`.
          </Text>
          <Playground code={smallAlert} scope={{ Alert }} />
        </Col>
      </Row>
    </Container>
  )
}