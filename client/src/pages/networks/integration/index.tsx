import { Suspense } from "react"
import { createIntl, RawIntlProvider } from "react-intl"
import { messages } from "../config/messages"
import useIntegration from "../hooks/useIntegration"
import NetworksLayout from "../layout"

export default function NetworksIntegration() {
  const { integrationLang: locale } = useIntegration()
  const intl = createIntl({
    locale,
    messages: messages[locale],
  })

  return (
    <RawIntlProvider value={intl}>
      <Suspense>
        <NetworksLayout />
      </Suspense>
    </RawIntlProvider>
  )
}
