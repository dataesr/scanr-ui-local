import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublicationFilters } from "../../../../api/publications";
import Histogram from "../../../../components/YearRangeSlider/histogram";
import { Button, ButtonGroup, Container, Icon, Modal, ModalClose, ModalContent, ModalFooter, ModalTitle, Tag, TagGroup, Text, Title } from "@dataesr/react-dsfr";
import { publicationTypeMapping } from "../../../../utils/string";
import { useSearchParams } from "react-router-dom";
import {
  parseSearchFiltersFromURL,
  stringifySearchFiltersForURL,
} from "../../../../utils/filters";


export default function PublicationFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('q') || "";
  const currentFilters = parseSearchFiltersFromURL(searchParams.get('filters'));
  const [nextFilters, setNextFilters] = useState(currentFilters);
  const [open, setOpen] = useState(null);
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


  if (isLoading) return <div />
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

  const handleFilter = (field, value, filterType = "terms") => setNextFilters((prev) => {
    const types = prev.find((el) => el.field === field)?.value || [];
    const nextTypes = types.includes(value) ? types.filter((el) => el !== value) : [...types, value];
    if (!nextTypes.length) return prev.filter((el) => el.field !== field)
    return [...prev.filter((el) => el.field !== field), { field: field, value: nextTypes, type: filterType }]
  })

  return (
    <>
      <TagGroup>
        <li>
          <button className="fr-tag fr-fi-icon" onClick={() => setOpen("filters")}>
            <Icon name="ri-equalizer-line" size="1x" />
            Filtres
          </button>
        </li>
        <Tag onClick={() => setOpen("type")} selected={currentFilters.find((el) => el.field === 'type')?.value?.length > 0}>
          {
            currentFilters.find((el) => el.field === 'type')?.value?.length
              ? currentFilters.find((el) => el.field === 'type')?.value.length > 1
                ? `${publicationTypeMapping[currentFilters.find((el) => el.field === 'type')?.value?.[0]]} (+${currentFilters.find((el) => el.field === 'type')?.value.length - 1})`
                : publicationTypeMapping[currentFilters.find((el) => el.field === 'type')?.value?.[0]]
              : 'Types'}
        </Tag>
        <Tag onClick={() => setOpen("projects")} selected={false}>
          Financements
        </Tag>
      </TagGroup>
      <Modal canClose={false} size="md" isOpen={open === "filters"} hide={() => setOpen(null)}>
        <ModalClose onClick={() => setOpen(null)} />
        <ModalContent>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flexGrow: 1 }} >
              <Title as="h3" look="h5" className="fr-mb-0">Filtres</Title>
            </div>
            <button className="fr-tag fr-fi-icon" onClick={() => setOpen(null)}>
              <Icon name="ri-close-line" size="1x" />
              Effacer les filtres
            </button>
          </div>
          <hr className="fr-mt-1w fr-mb-3w" />
          <Container fluid className="fr-my-2w">
            <Text bold size="md">Années de publication</Text>
            <Histogram height="75px" data={byYear.map((year) => year.count)} />
            <hr className="fr-mt-3w" />
            <Text className="fr-mt-3w fr-mb-0" bold size="md">Type de publication</Text>
            <Text className="fr-card__detail" size="sm">Conserver uniquement les publications de type:</Text>
            <TagGroup size="sm">
              {byType.map((type) => (
                <Tag
                  onClick={() => handleFilter('type', type.value)}
                  selected={currentFilters.find((el) => el.field === 'type')?.value?.includes(type.value)}
                >
                  {type.label}
                </Tag>
              ))}
            </TagGroup>
            <hr className="fr-mt-3w" />
            <Text className="fr-mt-3w fr-mb-0" bold size="md">Type de financement</Text>
            <Text className="fr-card__detail" size="sm">Conserver uniquement les publications avec un financement de type:</Text>
            <TagGroup>
              {byFunder.map((type) => (
                <Tag
                  onClick={() => handleFilter('projects.type', type.value)}
                  selected={currentFilters.find((el) => el.field === 'projects.type')?.value?.includes(type.value)}
                >
                  {type.label}
                </Tag>
              ))}
            </TagGroup>
            <hr className="fr-mt-3w" />
            <Text className="fr-mt-3w fr-mb-0" bold size="md">Type de financement</Text>
            <Text className="fr-card__detail" size="sm">Conserver uniquement les publications avec un financement de type:</Text>
            <TagGroup>
              {byFunder.map((type) => (
                <Tag
                  onClick={() => handleFilter('projects.type', type.value)}
                  selected={currentFilters.find((el) => el.field === 'projects.type')?.value?.includes(type.value)}
                >
                  {type.label}
                </Tag>
              ))}
            </TagGroup>
            <hr className="fr-mt-3w" />
            <Text className="fr-mt-3w fr-mb-0" bold size="md">Type de financement</Text>
            <Text className="fr-card__detail" size="sm">Conserver uniquement les publications avec un financement de type:</Text>
            <TagGroup>
              {byFunder.map((type) => (
                <Tag
                  onClick={() => handleFilter('projects.type', type.value)}
                  selected={currentFilters.find((el) => el.field === 'projects.type')?.value?.includes(type.value)}
                >
                  {type.label}
                </Tag>
              ))}
            </TagGroup>
            <hr className="fr-mt-3w" />
            <Text className="fr-mt-3w fr-mb-0" bold size="md">Type de financement</Text>
            <Text className="fr-card__detail" size="sm">Conserver uniquement les publications avec un financement de type:</Text>
            <TagGroup>
              {byFunder.map((type) => (
                <Tag
                  onClick={() => handleFilter('projects.type', type.value)}
                  selected={currentFilters.find((el) => el.field === 'projects.type')?.value?.includes(type.value)}
                >
                  {type.label}
                </Tag>
              ))}
            </TagGroup>
          </Container>
        </ModalContent>
        <ModalFooter>
          <ButtonGroup align="right" isInlineFrom="lg">
            <Button primary>Filtrer les résultats</Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
      <Modal isOpen={open === "type"} hide={() => setOpen(null)}>
        <ModalTitle>Types de publication</ModalTitle>
        <ModalContent>
          <Container fluid className="fr-my-2w">
            <TagGroup>
              {byType.map((type) => (
                <Tag
                  onClick={() => handleFilter('type', type.value)}
                  selected={currentFilters.find((el) => el.field === 'type')?.value?.includes(type.value)}
                >
                  {type.label} ({type.count})
                </Tag>
              ))}
            </TagGroup>
          </Container>
        </ModalContent>
        <ModalFooter>
          <hr />
          <ButtonGroup align="right" isInlineFrom="lg">
            <Button primary>Filtrer les résultats</Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
      <Modal isOpen={open === "projects"} hide={() => setOpen(null)}>
        <ModalTitle>Types de financement</ModalTitle>
        <ModalContent>
          <Container fluid className="fr-my-2w">
            <TagGroup>
              {byFunder.map((type) => (
                <Tag
                  onClick={() => handleFilter('projects.type', type.value)}
                  selected={currentFilters.find((el) => el.field === 'projects.type')?.value?.includes(type.value)}
                >
                  {type.label} ({type.count})
                </Tag>
              ))}
            </TagGroup>
          </Container>
        </ModalContent>
        <ModalFooter>
          <hr />
          <ButtonGroup align="right" isInlineFrom="lg">
            <Button primary>Filtrer les résultats</Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>

    </>
  )
}