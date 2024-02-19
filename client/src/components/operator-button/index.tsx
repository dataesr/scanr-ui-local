import { MenuButton, MenuItem, useDSFRConfig } from "@dataesr/dsfr-plus";
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
  return (
    <MenuButton
      label={(operator === "or")
        ? intl.formatMessage({ id: "operator-button.label.or" })
        : intl.formatMessage({ id: "operator-button.label.and" })
      }
      className="fr-ml-2w"
      placement="end"
      size="sm"
      aria-label="Options"
      variant="text"
      icon={(operator === "or") ? "union" : "intersect"}
      onAction={(key) => setOperator(key as Operator)}
    >
      <MenuItem
        key="or"
        className="fr-py-1v fr-px-2w"
        description={
          <>
            {intl.formatMessage({ id: "operator-button.item.common" })}
            <br />
            {intl.formatMessage({ id: "operator-button.item.and" })}
          </>
        }
        startContent={<span className="fr-icon-union fr-mr-2w" />}
      >
        <span className="fr-text--sm">
          Union
        </span>
      </MenuItem>
      <MenuItem
        key="and"
        className="fr-py-1v fr-px-2w"
        description={
          <>
            {intl.formatMessage({ id: "operator-button.item.common" })}
            <br />
            {intl.formatMessage({ id: "operator-button.item.or" })}
          </>
        }
        startContent={<span className="fr-icon-intersect fr-mr-2w" />}
      >
        <span className="fr-text--sm">
          Intersection
        </span>
      </MenuItem>
    </MenuButton>
  )
}