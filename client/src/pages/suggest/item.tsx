import { Fragment } from "react";
import { BadgeGroup, Badge, Text, Link, ButtonGroup, Button } from "@dataesr/dsfr-plus";
import { publicationTypeMapping, encode } from "../../utils/string";
import { Publication } from "../../types/publication";
import { useIntl } from "react-intl";

export type AddItemProps<T> = {
  data: T;
  highlight?: Record<string, string[]>;
  addItem?: (item: T) => void;
  disabled: boolean;
}
export type RemoveItemProps<T> = {
  data: T;
  removeItem?: (item: T) => void;
}

export function SuggestionAddItem({ data: publication, highlight, addItem, disabled }: AddItemProps<Publication>) {
  const intl = useIntl();
  return (
    <div className="result-item" key={publication.id}>
      <BadgeGroup className="fr-mt-1v">
        <Badge size="sm" color="purple-glycine" noIcon>{publicationTypeMapping[publication.type] || "Autre"}</Badge>
        <Badge size="sm" color={publication.isOa ? 'green-emeraude' : 'pink-macaron'} icon={publication.isOa ? 'lock-unlock-fill' : 'lock-fill'}>
          {publication.isOa ? 'Accès ouvert' : 'Accès fermé'}
        </Badge>
      </BadgeGroup>
      <Text bold className="fr-mb-0">
        {publication.title.default || publication.title?.fr || publication.title?.en}
      </Text>
      <Text bold size="sm" className="fr-mb-0">
        {publication?.authors?.slice(0, 5).map((author, k) => (
          <Fragment key={k}>
            {(k > 0) ? ', ' : ''}
            {author.fullName}
          </Fragment>
        ))}
        {publication?.authors?.length > 5 && <Text bold as="span"><i>{' '}et al.</i></Text>}
      </Text>
      <Text size="sm" className="fr-card__detail fr-mb-0">
        <i>
          {publication?.source?.title && `${publication?.source?.title}`}
          {publication?.source?.volume && `, ${publication.source?.volume}`}
          {publication?.source?.issue && ` (${publication.source?.issue})`}
          {(publication?.year && publication?.source?.title) && ", "}
          {publication?.year && `${publication.year}`}
          {publication?.source?.publisher && `, ${publication?.source?.publisher}`}
        </i>
      </Text>
      {highlight?.["domains.label.default"] && (
        <Text size="sm" className="fr-mb-0">
          Mots clés:
          {' '}
          <span dangerouslySetInnerHTML={{ __html: highlight?.["domains.label.default"] }} />
        </Text>
      )}
      {highlight?.["summary.default"] && (
        <Text size="sm" className="fr-mb-0">
          ...
          <span dangerouslySetInnerHTML={{ __html: highlight?.["summary.default"] }} />
          ...
        </Text>
      )}
      <ButtonGroup size="sm" isInlineFrom="xs" align="right">
        <Button
          variant="text"
          onClick={() => addItem(publication)}
          icon="add-line"
          iconPosition="right"
          disabled={disabled}
        >
          {intl.formatMessage({ id: 'suggest.items.add' })}
        </Button>
      </ButtonGroup>
    </div>
  )
}
export function SuggestionRemoveItem({ data: publication, removeItem }: RemoveItemProps<Publication>) {
  const intl = useIntl();
  return (
    <div>
      <div className="result-item" key={publication.id}>
        <Text bold className="fr-mb-1w">
          {publication.title.default || publication.title?.fr || publication.title?.en}
        </Text>
        <Text bold size="sm" className="fr-mb-0">
          {publication?.authors?.slice(0, 5).map((author, k) => (
            <Fragment key={k}>
              {(k > 0) ? ', ' : ''}
              {(author?.person) ? <Link href={`/authors/${encode(author.person)}`}>{author.fullName}</Link> : author.fullName}
            </Fragment>
          ))}
          {publication?.authors?.length > 5 && <Text bold as="span"><i>{' '}et al.</i></Text>}
        </Text>
        <Text size="sm" className="fr-card__detail fr-mb-0">
          <i>
            {publication?.source?.title && `${publication?.source?.title}`}
            {publication?.source?.volume && `, ${publication.source?.volume}`}
            {publication?.source?.issue && ` (${publication.source?.issue})`}
            {(publication?.year && publication?.source?.title) && ", "}
            {publication?.year && `${publication.year}`}
            {publication?.source?.publisher && `, ${publication?.source?.publisher}`}
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
          {intl.formatMessage({ id: 'suggest.items.remove' })}
        </Button>
      </ButtonGroup>
    </div>
  )
}