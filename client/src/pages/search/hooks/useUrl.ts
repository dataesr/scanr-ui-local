import { useCallback, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { ApiTypes } from "../../../types/commons";

type FilterValues = {
  label?: string;
  value: string | number;
}[];
export type Filter = {
  type: "terms" | "range" | "bool";
  values: FilterValues;
  operator?: "and" | "or";
};
export type Filters = {
  [key: string]: Filter;
};

export function parseSearchFiltersFromURL(
  urlFilters: string | null | undefined
): Filters {
  if (!urlFilters) return {};
  return JSON.parse(decodeURIComponent(urlFilters));
}

export function stringifySearchFiltersForURL(filters: Filters): string {
  if (!filters) return "";
  return encodeURIComponent(JSON.stringify(filters));
}

function fromFilterToElasticQuery(
  field: string,
  value: (string | number)[],
  type
): Record<string, unknown> {
  if (type === "bool") {
    return {
      terms: {
        [field]: value,
      },
    };
  }
  if (type === "range") {
    return {
      [type]: {
        [field]: {
          gte: value[0],
          lte: value[1],
        },
      },
    };
  }
  return {
    [type]: {
      [`${field}.keyword`]: value,
    },
  };
}

export function filtersToElasticQuery(
  filters: Filters
): Record<string, unknown>[] {
  if (!Object.keys(filters).length) return [];
  return Object.entries(filters).flatMap(([field, filter]) => {
    if (!filter?.values?.length || !filter?.type) return [];
    if (filter.operator === "and") {
      return filter?.values?.map(({ value }) =>
        fromFilterToElasticQuery(field, [value], filter.type)
      );
    }
    return [
      fromFilterToElasticQuery(
        field,
        filter.values.map(({ value }) => value),
        filter.type
      ),
    ];
  });
}

const getAPI = (pathname: string) => {
  const api = pathname.split("/")?.[2];
  if (
    pathname.split("/")?.[1] === "trouver-des-partenaires-pour-horizon-europe"
  )
    return "he";
  if (pathname === '/networks') return 'publications'
  return api as ApiTypes;
};

export default function useUrl() {
  const { pathname } = useLocation();
  const api = getAPI(pathname);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const currentFilters = parseSearchFiltersFromURL(searchParams.get("filters"));
  const filters = filtersToElasticQuery(currentFilters);

  const handleFilterChange = useCallback(
    ({ field, value, filterType = "terms", label = null }) => {
      if (!field || !value) return;
      const prev = { ...currentFilters };
      const filter = prev?.[field];
      if (filterType === "range") {
        const nextFilters = {
          ...prev,
          [field]: {
            values: [{ value: value?.[0] }, { value: value?.[1] }],
            type: filterType,
          },
        };
        searchParams.set("filters", stringifySearchFiltersForURL(nextFilters));
        setSearchParams(searchParams);
        return;
      }
      if (!filter) {
        const nextFilters = {
          ...prev,
          [field]: {
            values: [{ value, label }],
            type: filterType,
            operator: "or",
          },
        };
        searchParams.set("filters", stringifySearchFiltersForURL(nextFilters));
        setSearchParams(searchParams);
        return;
      }
      const nextFilterValues = filter?.values
        ?.map((value) => value?.value)
        ?.includes(value)
        ? filter?.values?.filter((el) => el.value !== value)
        : [...filter.values, { value, label }];
      const nextFilters = {
        ...prev,
        [field]: { ...filter, values: nextFilterValues },
      };

      searchParams.set("filters", stringifySearchFiltersForURL(nextFilters));
      setSearchParams(searchParams);
    },
    [currentFilters, searchParams, setSearchParams]
  );

  const handleDeleteFilter = useCallback(
    ({ field }) => {
      if (!field) return;
      const prev = { ...currentFilters };
      const { [field]: currentField, ...nextFilters } = prev;
      if (!currentField) return;
      searchParams.set("filters", stringifySearchFiltersForURL(nextFilters));
      setSearchParams(searchParams);
    },
    [currentFilters, searchParams, setSearchParams]
  );

  const setOperator = useCallback(
    (field, operator = "and") => {
      const prev = { ...currentFilters };
      const filter = prev?.[field] || {};
      const nextFilters = { ...prev, [field]: { ...filter, operator } };
      searchParams.set("filters", stringifySearchFiltersForURL(nextFilters));
      setSearchParams(searchParams);
    },
    [currentFilters, searchParams, setSearchParams]
  );

  const handleQueryChange = useCallback(
    (query) => {
      searchParams.delete("filters")
      searchParams.set("q", query)
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const clearFilters = useCallback(() => {
    searchParams.delete("filters")
    setSearchParams(searchParams)
  }, [searchParams, setSearchParams])

  const values = useMemo(() => {
    return {
      api,
      handleQueryChange,
      handleFilterChange,
      clearFilters,
      currentQuery,
      currentFilters,
      filters,
      setOperator,
      handleDeleteFilter,
    };
  }, [
    api,
    handleFilterChange,
    handleQueryChange,
    clearFilters,
    currentFilters,
    filters,
    currentQuery,
    setOperator,
    handleDeleteFilter,
  ]);

  return values;
}
