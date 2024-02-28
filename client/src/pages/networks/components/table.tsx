import { useMemo } from "react"
import { Container } from "@dataesr/dsfr-plus"
import useSearchData from "../hooks/useSearchData"
import { Network } from "../../../types/network"

export default function ClustersTable({ currentTab }: { currentTab: string }) {
  const { search, currentQuery, currentFilters } = useSearchData(currentTab)
  const network = search?.data as Network
  const communities = network?.clusters
  const key = useMemo(
    () => JSON.stringify({ currentTab, currentQuery, currentFilters }),
    [currentTab, currentQuery, currentFilters]
  )

  if (search.isFetching || !communities)
    return (
      <Container
        className="fr-mt-5w"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "500px" }}
      />
      // Add spinner
    )

  return (
    <Container key={key} className="fr-mt-5w">
      <table style={{ fontSize: 12 }} width={"100%"}>
        <tr>
          <th>Community</th>
          <th>Size</th>
          <th>Aggregations</th>
          <th>Last activity</th>
        </tr>
        {communities.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.cluster}</td>
              <td>{val.size}</td>
              <td>{val.aggs}</td>
              <td>{val.maxYear}</td>
            </tr>
          )
        })}
      </table>
    </Container>
  )
}
