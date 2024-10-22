import { Row, Col, Text, useDSFRConfig, Link } from "@dataesr/dsfr-plus";
import { SoftwareMention } from "../../../../../types/publication";
import { getWikidataPreviews } from "../../../../../components/wiki/api";
import { useQuery } from "@tanstack/react-query";
import { WikipediaResult } from "../../../../../components/wiki/types";
import { Fragment } from "react/jsx-runtime";

export default function Softwares({ softwares }: { softwares: SoftwareMention[] }) {
  const { locale } = useDSFRConfig();

  const codes = softwares
    .map((software) => software.wikidata)
    .filter((wikidata) => !!wikidata)
    .map((wikidata) => ({ code: wikidata }));

  const { data: wikis } = useQuery<WikipediaResult[]>({
    queryKey: ["wikidatas", codes.map(c => c.code), locale],
    queryFn: () => getWikidataPreviews(codes, locale),
    enabled: !!codes?.length,
  });

  const getSoftwareContexts = (softwareName: string, contexts?: string[]) => {
    if (!contexts.length) return null;
    const newContexts = contexts.map((context) => {
      const name = softwareName.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')
      try {
        const regexp = new RegExp(name, "ig")
        const newContext = context.replace(regexp, `<strong>${softwareName}</strong>`);
        return newContext;
      } catch (e) {
        return context;
      }
    });
    const stringContexts = newContexts.reduce((acc, cur) => {
      if (acc.length === 0) return cur;
      if (acc.length > 300) return acc;
      return `${acc} ... ${cur}`;
    }, "");

    return <span dangerouslySetInnerHTML={{ __html: stringContexts }} />
  }

  const _softwares = softwares.map((software) => {
    const wiki = wikis?.find((w) => w.code === software.wikidata);
    return { ...software, wiki };
  })


  if (!softwares.length) return null;
  return (
    <Row gutters>
      <Col xs="12">
        {_softwares.map((software) => (
          <div key={software.id_name}>
            <Text size="lg" className="fr-mb-0" bold>
              {software.softwareName}
              {software?.wiki?.code && <span className="pointer fr-icon-information-line fr-text-default--info fr-icon--sm fr-ml-1v fr-text-mention--grey" aria-describedby={`software-${software.wiki.code}`} />}
            </Text>
            {software?.wiki?.code && (
              <Fragment key={software.wiki.code}>
                <span className="fr-tooltip fr-placement" id={`software-${software.wiki.code}`} role="tooltip" aria-hidden="true">
                  <div className="fr-p-2w">
                    <div className="wiki-text">
                      <Text bold size="lg">
                        {software.wiki?.title}
                      </Text>
                      <Text size="sm">
                        {software.wiki?.extract}
                      </Text>
                    </div>
                    {software.wiki?.image && (
                      <img style={{ objectFit: "cover" }} width="100%" height="100px" src={software.wiki.image} aria-hidden />
                    )}
                    <hr className="fr-my-1w" />
                    <Link href={software.wiki.url} target="_blank">
                      Wikipedia
                    </Link>
                  </div>
                </span>
              </Fragment>
            )}
            {!!software?.contexts?.length && (
              <Text className="fr-text-mention--grey fr-text--sm">
                {getSoftwareContexts(software.softwareName, software.contexts)}
              </Text>
            )}
          </div>
        ))}
      </Col>
    </Row>
  );
}
