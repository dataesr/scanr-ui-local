import { useIntl } from "react-intl"
import useTrends from "../../../hooks/useTrends"
import { useTrendsContext } from "../../../context"
import useOptions from "../../../hooks/useOptions"
import { trendsRankingSortFromId, trendsRankingSortFromLabel } from "../../../config/sorting"

function SortIcon({ sort, currentSort, sortIcon }: { sort: string; currentSort: string; sortIcon: string }) {
  if (sort !== currentSort) return null
  return <span className={`fr-icon-${sortIcon}`} aria-hidden="true" />
}

export default function TrendsTableHeader() {
  const intl = useIntl()
  const { trendsYears } = useTrends()
  const { sort, setSort, setFocus } = useTrendsContext()
  const { currentModel, handlePageChange } = useOptions()
  const currentSort = trendsRankingSortFromId(sort)

  const handleSortChange = (sortLabel: string) => {
    const headerSort = trendsRankingSortFromLabel(sortLabel)
    // set next sort
    sortLabel === currentSort.label ? currentSort?.nextSort && setSort(currentSort.nextSort) : setSort(headerSort.id) // change sorting
    handlePageChange(1) // reset page
    setFocus("") // reset focus
  }

  const sortIcon = currentSort.order === "top" ? "arrow-up-line" : "arrow-down-line"

  return (
    <thead>
      <tr>
        <th>Rank</th>
        <th onClick={() => console.log("domains")}>{intl.formatMessage({ id: `trends.ranking.header.domains` })}</th>
        <th className="sort-button" onClick={() => handleSortChange("count")}>
          {intl.formatMessage({ id: `trends.ranking.header.count` }, { max: trendsYears.max })}
          <SortIcon sort="count" currentSort={currentSort.label} sortIcon={sortIcon} />
        </th>
        <th
          className="sort-button"
          onClick={() => handleSortChange("variation")}
          title={`The variation between the volume in ${trendsYears.max} and the previous years average volume`}
        >
          Growth
          <SortIcon sort="variation" currentSort={currentSort.label} sortIcon={sortIcon} />
        </th>
        <th className="sort-button" onClick={() => handleSortChange("trend")}>
          {intl.formatMessage({ id: `trends.ranking.header.trend` }, { count: trendsYears.max - trendsYears.min + 1 })}
          <SortIcon sort="trend" currentSort={currentSort.label} sortIcon={sortIcon} />
        </th>
        {currentModel === "entity-fishing" && <th>Description</th>}
        {currentModel !== "entity-fishing" && currentModel !== "open-alex-domains" && <th>Category</th>}
      </tr>
    </thead>
  )
}
