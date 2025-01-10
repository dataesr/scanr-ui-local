import useCopyToClipboard from "../../hooks/useCopyToClipboard"
import { RawIntlProvider, createIntl } from "react-intl"
import { Button, ButtonProps, useDSFRConfig } from "@dataesr/dsfr-plus"

const modules = import.meta.glob("./locales/*.json", { eager: true, import: "default" })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1]
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc
}, {})

export type CopyButtonProps = (
  | { copyText: string; copyTextOnClick?: never }
  | { copyText?: never; copyTextOnClick: () => string }
) &
  ButtonProps

export default function CopyButton({ copyText, copyTextOnClick, ...buttonProps }: CopyButtonProps) {
  const { locale } = useDSFRConfig()
  const intl = createIntl({ locale, messages: messages[locale] })
  const { copyStatus, copy } = useCopyToClipboard()

  return (
    <RawIntlProvider value={intl}>
      <Button
        {...buttonProps}
        icon={copyStatus === 1 ? "success-line" : buttonProps?.icon}
        onClick={() => {
          if (copyText !== undefined) copy(copyText)
          if (copyTextOnClick !== undefined) copy(copyTextOnClick())
        }}
      >
        {buttonProps?.children}
      </Button>
    </RawIntlProvider>
  )
}
