import { useQuery } from "@tanstack/react-query";
import { getPublicationFilters } from "../../../../api/publications";
import Histogram from "../../../../components/YearRangeSlider/histogram";
import { Accordion, AccordionItem, Container } from "@dataesr/react-dsfr";
import { publicationTypeMapping } from "../../../../utils/string";
import { useSearchParams } from "react-router-dom";
import { KeywordFacet } from "../../../../components/facet/keywords";
import { useEffect, useState } from "react";
import {
  parseSearchFiltersFromURL,
  stringifySearchFiltersForURL,
} from "../../../../utils/filters";
import BarLink from "../../../../components/bar-link";


export default function PublicationAnalytics() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('q') || "";
  const currentFilters = parseSearchFiltersFromURL(searchParams.get('filters'));
  const [nextFilters, setNextFilters] = useState(currentFilters);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["filters", "publications", currentQuery],
    queryFn: () => getPublicationFilters(currentQuery),
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    searchParams.set('filters', stringifySearchFiltersForURL(nextFilters));
    setSearchParams(searchParams);
  }, [nextFilters]);


  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  const _100 = Math.max(...data?.byYear?.buckets?.map((el) => el.doc_count));
  const byYear = data?.byYear?.buckets?.map((element) => {
    return {
      value: element.key,
      count: element.doc_count * 100 / _100,
    }
  }) || [];
  const byType = data?.byPublicationType?.buckets?.map((element) => {
    if (!publicationTypeMapping[element?.key]) return null;
    return {
      value: element.key,
      label: publicationTypeMapping[element.key],
      count: element.doc_count,
    }
  }).filter(el => el) || [];

  const byFunder = data?.byFunder?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const byAuthors = data?.byAuthors?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.byFullName.buckets?.[0]?.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const maxCommonPublications = Math.max(...byAuthors?.map((el) => el.count));
  return (
    <>
      <Accordion keepOpen>
        <AccordionItem title="Publications par année" initExpand>
          <Container fluid className="fr-m-2w histogram-filter">
            <Histogram data={byYear.map((year) => year.count)} />
          </Container>
        </AccordionItem>
        <AccordionItem title="Publications par type" initExpand>
          <KeywordFacet value={currentFilters.find((el) => el.field === 'type')?.value || []} data={byType} onChange={(value) => setNextFilters((prev) => {
            if (!value.length) return prev.filter((el) => el.field !== "type");
            return [...prev.filter((el) => el.field !== "type"), { field: "type", value, type: "terms" }]
          })} />
        </AccordionItem>
        <AccordionItem title="Filtrer par type de financement">
          <KeywordFacet value={currentFilters.find((el) => el.field === 'projects.type')?.value || []} data={byFunder} onChange={(value) => setNextFilters((prev) => {
            if (!value.length) return prev.filter((el) => el.field !== "projects.type");
            return [...prev.filter((el) => el.field !== "projects.type"), { field: "projects.type", value, type: "terms" }]
          })} />
        </AccordionItem>
        <AccordionItem title="Top auteurs" initExpand>
          {byAuthors?.slice(0, 10)?.map((coAuthor) => (
            <BarLink
              key={coAuthor.value}
              name={coAuthor.label}
              count={coAuthor.count}
              width={coAuthor.count * 100 / maxCommonPublications}
              href={`/authors/${coAuthor.value}`}
            />
          ))}
        </AccordionItem>
      </Accordion>
      {/* <Row gutters alignItems="right">
        <Col n="12">
          <Text bold size="lg">Filtrer par année de publication</Text>
        </Col>
        <Col n="12">
          <Separator />
          <Text bold size="lg">Filtrer par type de publication</Text>
          <KeywordFacet value={currentFilters.find((el) => el.field === 'type')?.value || []} data={byType} onChange={(value) => setNextFilters((prev) => {
            if (!value.length) return prev.filter((el) => el.field !== "type");
            return [...prev.filter((el) => el.field !== "type"), { field: "type", value, type: "terms" }]
          })} />
        </Col>
      </Row>
      <Separator />
      <ButtonGroup>
        <Button onClick={() => {
          searchParams.set('filters', stringifySearchFiltersForURL(nextFilters));
          setSearchParams(searchParams);
        }} disabled={isButtonDisabled}>Afficher les {(!isButtonDisabled && (count < 10000)) ? `${count} ` : " "}publications</Button>
      </ButtonGroup> */}
    </>
  )
}