import { Button, Container, Title, Text, Row, Col, Breadcrumb, Link, ModalContent, ButtonGroup, Modal, ModalFooter, ModalTitle } from '@dataesr/react-dsfr';
import { useState } from 'react';
import Playground from '../../components/Playground';

const modal = `
() => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <Button onClick={(e) => {setIsOpen(true); e.preventDefault()}}>Ouvir la modale</Button>
    <Modal isOpen={isOpen} hide={() => setIsOpen(false)}>
      <ModalTitle>Opened Controlled</ModalTitle>
      <ModalContent>Hello Modal</ModalContent>
      <ModalFooter>
        <ButtonGroup isInlineFrom="xs" align="right">
          <Button>Hello</Button>
          <Button variant="secondary">Bye Bye</Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
    </>
  )
}
`;
const modalUncontrolled = `
<>
  <Button data-fr-opened="false" aria-controls="modal-4">Ouvir la modale</Button>
  <Modal isOpen id="modal-4">
    <ModalTitle>Opened Uncontrolled</ModalTitle>
    <ModalContent>Hello Modal</ModalContent>
    <ModalFooter>
      <ButtonGroup isInlineFrom="xs" align="right">
        <Button>Hello</Button>
        <Button variant="secondary">Bye Bye</Button>
      </ButtonGroup>
    </ModalFooter>
  </Modal>
</>
`;

export function Modals() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link aria-current="page">Modale - Modal</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Modale - Modal</Title>
          <Text>
            La modale permet de concentrer l’attention
            de l’utilisateur exclusivement sur une tâche ou un élément d’information,
            sans perdre le contexte de la page en cours.
            Ce composant nécessite une action de l’utilisateur afin d'être clôturée ou ouverte.
          </Text>
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Modale simple</Title>
          <Playground code={modal} scope={{ Button, ButtonGroup, Modal, ModalTitle, ModalContent, ModalFooter, useState }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Modale non controlée</Title>
          <Playground code={modalUncontrolled} scope={{ Button, ButtonGroup, Modal, ModalTitle, ModalContent, ModalFooter }} defaultShowCode />
        </Col>
      </Row>
    </Container>
  )
}