import { Link, Text } from "@dataesr/dsfr-plus"
import useWikidata from "../../hooks/useWikidata"
import { Fragment } from "react/jsx-runtime"

export default function Wikidata({ item }) {
  const { wikis } = useWikidata()
  const wiki = wikis?.find((w) => w.code === item.id)

  return (
    <div key={item.id}>
      <Text size="lg" className="fr-mb-0" bold>
        {/* {item.label} */}
        {wiki?.code && (
          <span
            className="pointer fr-icon-information-line fr-text-default--info fr-icon--sm fr-ml-1v fr-text-mention--grey"
            aria-describedby={`wiki-${wiki.code}`}
          />
        )}
      </Text>
      {wiki?.code && (
        <Fragment key={wiki.code}>
          <span className="fr-tooltip fr-placement" id={`wiki-${wiki.code}`} role="tooltip" aria-hidden="true">
            <div className="fr-p-2w">
              <div className="wiki-text">
                <Text bold size="lg">
                  {wiki?.title}
                </Text>
                <Text size="sm">{wiki?.extract}</Text>
              </div>
              {wiki?.image && (
                <img style={{ objectFit: "cover" }} width="100%" height="100px" src={wiki.image} aria-hidden />
              )}
              <hr className="fr-my-1w" />
              <Link href={wiki.url} target="_blank">
                Wikipedia
              </Link>
            </div>
          </span>
        </Fragment>
      )}
    </div>
  )
}
