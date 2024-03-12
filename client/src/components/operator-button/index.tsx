import { Button, useDSFRConfig } from "@dataesr/dsfr-plus";
import { createIntl } from "react-intl";

type Operator = "or" | "and";
export type OperatorProps = {
  operator: Operator;
  setOperator: (key: Operator) => void;
}

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});


export default function OperatorButton({ operator, setOperator }: OperatorProps) {
  const { locale } = useDSFRConfig();
  const intl = createIntl({
    locale,
    messages: messages[locale]
  });
  const isUnion = operator === "or";
  return (
    <Button
      variant="text"
      size="sm"
      icon={isUnion ? "union" : "intersect"}
      onClick={() => setOperator((isUnion ? "and" : "or") as Operator)}
      aria-label={intl.formatMessage({ id: `operator-button.switch.${operator}` })}
    >

      {(operator === "or")
        ? intl.formatMessage({ id: "operator-button.label.or" })
        : intl.formatMessage({ id: "operator-button.label.and" })
      }

    </Button>
  )
}