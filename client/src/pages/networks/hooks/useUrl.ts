import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import useSearchUrl from "../../search/hooks/useUrl";
import useTab from "./useTab";

export default function useUrl() {
    const { api,
        handleFilterChange,
        handleQueryChange,
        clearFilters,
        currentFilters,
        filters,
        setOperator,
        handleDeleteFilter } = useSearchUrl();
    const { currentTab, handleTabChange } = useTab()
    const [searchParams] = useSearchParams()
    const currentQuery = searchParams.get("q")

    const values = useMemo(() => {
        return {
            api,
            currentQuery,
            handleQueryChange,
            currentTab,
            handleTabChange,
            currentFilters,
            filters,
            handleFilterChange,
            clearFilters,
            setOperator,
            handleDeleteFilter,
        };
    }, [
        api,
        currentQuery,
        handleQueryChange,
        currentTab,
        handleTabChange,
        currentFilters,
        filters,
        handleFilterChange,
        clearFilters,
        setOperator,
        handleDeleteFilter,
    ]);

    return values;
}