import { createIntl, RawIntlProvider } from "react-intl"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import { messages } from "./config/messages"
import NetworksLayout from "./layout"

export default function Networks() {
  const { locale } = useDSFRConfig()
  const intl = createIntl({
    locale,
    messages: messages[locale],
  })
  return (
    <RawIntlProvider value={intl}>
      <NetworksLayout />
    </RawIntlProvider>
  )
}
