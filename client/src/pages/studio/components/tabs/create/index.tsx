import { useState } from "react"
import { useIntl } from "react-intl"
import { Button, Container, Row, Select, SelectOption, TextInput } from "@dataesr/dsfr-plus"
import StudioCreateOptions from "./options"
import { isInProduction } from "../../../../../utils/helpers"

export default function StudioCreate() {
  const intl = useIntl()
  const [local, setLocal] = useState("130015506") // University of Lorraine
  const [page, setPage] = useState("networks")
  const [options, setOptions] = useState("")
  const [lang, setLang] = useState("fr")

  const pageUrl = `${window.location.origin}/${page}/integration?local=${local}${options}`
  const integrationIframeId = `${page}_iframe`
  const integrationIframe = <iframe height="900px" width="100%" id={integrationIframeId} src={pageUrl} />

  const copyIframe = () => {
    const src = (document.getElementById(integrationIframeId) as HTMLIFrameElement).contentWindow.location.href
    const text = `<iframe height="900" width="900" id="${integrationIframeId}" src="${src}" </iframe>`
    navigator.clipboard.writeText(text)
  }

  const copyUrl = () => {
    const text = (document.getElementById(integrationIframeId) as HTMLIFrameElement).contentWindow.location.href
    navigator.clipboard.writeText(text)
  }

  return (
    <section className="studio-section-create">
      <TextInput
        hint={intl.formatMessage({ id: "studio.create.identifier.hint" })}
        label={intl.formatMessage({ id: "studio.create.identifier.label" })}
        message={intl.formatMessage({ id: "studio.create.identifer.message" })}
        messageType={local === "" ? "error" : null}
        onChange={(event) => setLocal(event.target.value)}
        required
        value={local}
      />
      <Select
        label={intl.formatMessage({ id: "studio.create.select-lang.label" })}
        selectedKey={lang}
        onSelectionChange={(key) => setLang(String(key))}
      >
        <SelectOption key={"fr"}>{intl.formatMessage({ id: "studio.create.lang.fr" })}</SelectOption>
        <SelectOption key={"en"}>{intl.formatMessage({ id: "studio.create.lang.en" })}</SelectOption>
      </Select>
      <Select
        label={intl.formatMessage({ id: "studio.create.select-page.label" })}
        selectedKey={page}
        onSelectionChange={(key) => setPage(String(key))}
      >
        <SelectOption key="networks">{intl.formatMessage({ id: "studio.create.page.networks" })}</SelectOption>
        {!isInProduction() && (
          <SelectOption key="trends">{intl.formatMessage({ id: "studio.create.page.trends" })}</SelectOption>
        )}
      </Select>
      <StudioCreateOptions key={page} page={page} setOptions={setOptions} />
      <Container className="fr-my-2w fr-card studio">{integrationIframe}</Container>
      <Row horizontalAlign="center">
        <Button icon={"clipboard-fill"} iconPosition="right" onClick={copyIframe}>
          {intl.formatMessage({ id: "studio.create.copy-iframe.label" })}
        </Button>
        <Button className="fr-ml-2w" icon={"clipboard-fill"} iconPosition="right" onClick={copyUrl}>
          {intl.formatMessage({ id: "studio.create.copy-url.label" })}
        </Button>
      </Row>
    </section>
  )
}
