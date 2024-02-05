import { Row, BadgeGroup, Link, Badge, Title, Text, useDSFRConfig } from "@dataesr/dsfr-plus";
import { publicationTypeMapping, encode } from "../../../../../utils/string";
import { useIntl } from "react-intl";
import Truncate from "../../../../../components/truncate";
import getLangFieldValue from "../../../../../utils/lang";

export default function PublicationsHeader({ data, authors, affiliations }) {
  const intl = useIntl();
  const { locale } = useDSFRConfig();
  const summary = getLangFieldValue(locale)(data?.summary);
  return (
    <section>
      <div>
        <BadgeGroup>
          <Badge color="purple-glycine" noIcon>{publicationTypeMapping[data.type]}</Badge>
          <Badge color={data.isOa ? 'green-emeraude' : 'pink-macaron'} icon={data.isOa ? 'lock-unlock-line' : 'lock-line'}>
            {intl.formatMessage({ id: `publications.header.oa.${data.isOa ? "true" : "false"}` })}
          </Badge>
        </BadgeGroup>
        <Title className="fr-mb-1v" as="h1" look="h4">{data.title.default}</Title>
        <Text bold size="sm" className="fr-mb-1v">
          {authors.map((author, i) => (
            <>
              {(i > 0) ? ', ' : ''}
              {(author?.person) ? <Link href={`/authors/${encode(author.person)}`}>{author.fullName}</Link> : author.fullName}
              {affiliations
                ?.filter((affiliation) => affiliation.authors.includes(author.fullName))
                .map((affiliation, i) => (
                  <>
                    <sup>
                      {(i > 0) ? ', ' : ''}
                      {affiliation.index + 1}
                    </sup>
                  </>
                )
                )}
            </>
          ))}
        </Text>
        <Text bold size="md" className="fr-card__detail">
          {data?.source?.title && `${data.source.title}`}
          {data?.source?.volume && `, ${data.source.volume}`}
          {data?.source?.issue && ` (${data.source.issue})`}
          {(data?.year && data.source.title) && ", "}
          {data?.year && `${data.year}`}
          {data?.source?.publisher && `, ${data.source.publisher}`}
        </Text>
      </div>
      {summary && (<Row>
        <Text className="fr-mt-3w fr-mb-0" bold>{intl.formatMessage({ id: "publications.header.summary" })}</Text>
        <Truncate lines={6} className="fr-mt-2w">
          <Text className="fr-m-0" size="sm">{summary}</Text>
        </Truncate>
      </Row>)}
    </section>
  )
}