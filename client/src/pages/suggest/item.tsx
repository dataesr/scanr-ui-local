import { Fragment } from "react";
import {
  BadgeGroup,
  Badge,
  Text,
  Link,
  ButtonGroup,
  Button,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { publicationTypeMapping, encode } from "../../utils/string";
import { LightPublication } from "../../types/publication";
import { useIntl } from "react-intl";
import getLangFieldValue from "../../utils/lang";

export type AddItemProps<T> = {
  data: T;
  highlight?: Record<string, string[]>;
  addItem?: (item: T) => void;
  disabled: boolean;
  isIdentified: boolean;
};
export type RemoveItemProps<T> = {
  data: T;
  removeItem?: (item: T) => void;
};

export function SuggestionAddItem({
  data: publication,
  highlight,
  addItem,
  disabled,
  isIdentified,
}: AddItemProps<LightPublication>) {
  const { locale } = useDSFRConfig();
  const intl = useIntl();
  return (
    <div className="result-item" key={publication.id} style={{ opacity: (isIdentified ? "0.7" : "1") }}>
      <BadgeGroup className="fr-mt-1v">
        <Badge size="sm" color="purple-glycine" noIcon>
          {publicationTypeMapping[publication.type] ||
            intl.formatMessage({ id: "suggest.items.type.other" })}
        </Badge>
        <Badge
          size="sm"
          color={publication.isOa ? "green-emeraude" : "pink-macaron"}
          icon={publication.isOa ? "lock-unlock-fill" : "lock-fill"}
        >
          {publication.isOa
            ? intl.formatMessage({ id: "suggest.items.is-oa.true" })
            : intl.formatMessage({ id: "suggest.items.is-oa.false" })}
        </Badge>
      </BadgeGroup>
      <Text bold className="fr-mb-0">
        {getLangFieldValue(locale)(publication.title)}
      </Text>
      <Text bold size="sm" className="fr-mb-0">
        {publication?.authors?.slice(0, 5).map((author, k) => (
          <Fragment key={k}>
            {k > 0 ? ", " : ""}
            {author.fullName}
          </Fragment>
        ))}
        {publication?.authors?.length > 5 && (
          <Text bold as="span">
            <i> et al.</i>
          </Text>
        )}
      </Text>
      <Text size="sm" className="fr-card__detail fr-mb-0">
        <i>
          {publication?.source?.title && `${publication?.source?.title}`}
          {publication?.source?.volume && `, ${publication.source?.volume}`}
          {publication?.source?.issue && ` (${publication.source?.issue})`}
          {publication?.year && publication?.source?.title && ", "}
          {publication?.year && `${publication.year}`}
          {publication?.source?.publisher &&
            `, ${publication?.source?.publisher}`}
        </i>
      </Text>
      {publication.landingPage && (
        <Link target="_blank" className="fr-text--xs" href={publication.landingPage}>
          {intl.formatMessage({ id: "suggest.items.landing-page" })}
        </Link>
      )}
      {Object.values(highlight || {}).map((value, i) => (
        <Text key={i} size="sm" className="fr-mb-0">
          <span dangerouslySetInnerHTML={{ __html: value }} />
        </Text>
      ))}
      <ButtonGroup size="sm" isInlineFrom="xs" align="right">
        <Button
          variant="text"
          onClick={() => addItem(publication)}
          icon={!isIdentified && "add-line"}
          iconPosition="right"
          disabled={disabled || isIdentified}
        >
          {isIdentified
            ? intl.formatMessage({ id: "suggest.items.identified" })
            : intl.formatMessage({ id: "suggest.items.add" })
          }
        </Button>
      </ButtonGroup>
    </div>
  );
}
export function SuggestionRemoveItem({
  data: publication,
  removeItem,
}: RemoveItemProps<LightPublication>) {
  const { locale } = useDSFRConfig();
  const intl = useIntl();
  return (
    <div>
      {
        publication.externalIds?.find((i) => i.type === 'hal') && (
          <Text size="xs" className="fr-mb-0">
            <em>
              {intl.formatMessage({ id: "suggest.items.in-hal" })}
            </em>
          </Text>
        )
      }
      <div className="result-item" key={publication.id}>
        <Text bold className="fr-mb-1w">
          {getLangFieldValue(locale)(publication.title)}
        </Text>
        <Text bold size="sm" className="fr-mb-0">
          {publication?.authors?.slice(0, 5).map((author, k) => (
            <Fragment key={k}>
              {k > 0 ? ", " : ""}
              {author?.person ? (
                <Link href={`/authors/${encode(author.person)}`}>
                  {author.fullName}
                </Link>
              ) : (
                author.fullName
              )}
            </Fragment>
          ))}
          {publication?.authors?.length > 5 && (
            <Text bold as="span">
              <i> et al.</i>
            </Text>
          )}
        </Text>
        <Text size="sm" className="fr-card__detail fr-mb-0">
          <i>
            {publication?.source?.title && `${publication?.source?.title}`}
            {publication?.source?.volume && `, ${publication.source?.volume}`}
            {publication?.source?.issue && ` (${publication.source?.issue})`}
            {publication?.year && publication?.source?.title && ", "}
            {publication?.year && `${publication.year}`}
            {publication?.source?.publisher &&
              `, ${publication?.source?.publisher}`}
          </i>
        </Text>
      </div>
      <ButtonGroup size="sm" isInlineFrom="xs" align="right">
        <Button
          color="error"
          variant="text"
          onClick={() => removeItem(publication)}
          icon="delete-bin-line"
          iconPosition="right"
        >
          {intl.formatMessage({ id: "suggest.items.remove" })}
        </Button>
      </ButtonGroup>
    </div>
  );
}
