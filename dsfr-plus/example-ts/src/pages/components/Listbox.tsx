import { useState } from 'react';
import { Breadcrumb, Badge, Link, Listbox, Container, Col, Row, Title, Text, Tag, TagGroup } from '@dataesr/react-dsfr';
import Playground from '../../components/Playground';


const simple = `
() => {
  const [value, setValue] = useState([])
  return (
    <Listbox
      topContent={
        <div style={{borderBottom: "1px solid grey"}}>
          Vous avez séléctionné:
          {value.length > 0
            ? (<TagGroup>{value.map((v) => (<Tag size="sm" key={v} color="green-emeraude">{value}</Tag>))}</TagGroup>)
            : <p className="fr-text--xs fr-text-mention--grey"><em>Aucun élément séléctionné</em></p>
          }
        </div>
      }
      bottomContent={
        value.length > 0 
          ? <>Vous avez séléctionné: <TagGroup>{value.map((v) => (<Tag key={v} color="green-emeraude">{value}</Tag>))}</TagGroup></>
          : undefined
      }
      selectionMode="single"
      onSelectionChange={setValue}
    >
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          description="Selectionnez le premier element"
          value="#1"
        >
          Premier element
        </ListboxItem>
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          description="Selectionnez le deuxieme element"
          value="#2"
        >
          Deuxieme element
        </ListboxItem>
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          description="Selectionnez le troisieme element"
          value="#3"
        >
          Troisieme element
        </ListboxItem>
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          description="Selectionnez le quatrieme element"
          value="#4"
        >
          Quatrieme element
        </ListboxItem>
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          description="Selectionnez le cinquieme element"
          value="#5"
        >
          Cinquieme element
        </ListboxItem>
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          description="Selectionnez le sixieme element"
          value="#6"
        >
          Sixieme element
        </ListboxItem>
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          description="Selectionnez le septieme element"
          value="#7"
        >
          Septieme element
        </ListboxItem>
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          description="Selectionnez le huitieme element"
          value="#8"
        >
          Huitieme element
        </ListboxItem>
    </Listbox>
  );
}
`
const multi = `
() => {
  const [value, setValue] = useState([])
  return (
    <Listbox
      topContent={
        value.length > 0 
          ? <>Vous avez séléctionné: <TagGroup>{value.map((v) => (<Tag key={v} color="green-emeraude">{v}</Tag>))}</TagGroup></>
          : undefined
      }
      selectionMode="multiple"
      onSelectionChange={setValue}
    >
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          description="Selectionnez le premier element"
          value="#1"
        >
          Premier element
        </ListboxItem>
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          description="Selectionnez le deuxieme element"
          value="#2"
        >
          Deuxieme element
        </ListboxItem>
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          description="Selectionnez le troisieme element"
          value="#3"
        >
          Troisieme element
        </ListboxItem>
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          description="Selectionnez le quatrieme element"
          value="#4"
        >
          Quatrieme element
        </ListboxItem>
    </Listbox>
  );
}
`

const href = `
() => {
  const items = [{label: "Hello", value: "HelloValue"}, {label: "Bye", value: "ByeValue"}]
  return (
    <Listbox>
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          endContent={<Badge variant="new">New</Badge>}
          description={items[0].value}
          value={items[0].value}
          href="/#"
        >
          {items[0].value}
        </ListboxItem>
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          endContent={<Badge variant="info">Info</Badge>}
          description={items[1].value}
          value={items[1].value}
          href="/#"
        >
          {items[1].value}
        </ListboxItem>
    </Listbox>
  );
}
`

const action = `
() => {
  const items = [{label: "Hello", value: "HelloValue"}, {label: "Bye", value: "ByeValue"}]
  return (
    <Listbox onAction={(value) => alert(value)}>
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          endContent={<Badge variant="new">New</Badge>}
          description={items[0].value}
          value={items[0].value}
        >
          {items[0].value}
        </ListboxItem>
        <ListboxItem
          startContent={<span className="fr-icon-building-line" />}
          endContent={<Badge variant="info">Info</Badge>}
          description={items[1].value}
          value={items[1].value}
        >
          {items[1].value}
        </ListboxItem>
    </Listbox>
  );
}
`

export function Listboxes() {

  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link aria-current="page">Autocomplete</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Autocomplete</Title>
          <Text>
            Permet une autocompletion
          </Text>
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Séléction simple</Title>
          <Playground code={simple} scope={{ Listbox, ListboxItem, useState, Tag, TagGroup }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Séléction multiple</Title>
          <Playground code={multi} scope={{ Listbox, ListboxItem, useState, Tag, TagGroup }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Liens</Title>
          <Playground code={href} scope={{ Badge, Listbox, ListboxItem }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">onAction</Title>
          <Playground code={action} scope={{ Badge, Listbox, ListboxItem, alert }} />
        </Col>
      </Row>
    </Container>
  )
}