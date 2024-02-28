import { useMemo } from "react"
import { Container } from "@dataesr/dsfr-plus"
import useSearchData from "../hooks/useSearchData"
import { NetworkData } from "../../../types/network"

// const communityGetAggs = (obj) => (obj === undefined ? [] : Object.entries(obj))

// const communitiesGetAggsKeys = (communities) =>
//   communities?.reduce(
//     (acc, community) => [...new Set([...acc, ...communityGetAggs(community?.aggs).map((item) => item[0])])],
//     []
//   )

export default function ClustersTable({ currentTab }: { currentTab: string }) {
  const { search, currentQuery, currentFilters } = useSearchData(currentTab)
  const network = search?.data?.network as NetworkData
  const communities = network?.clusters
  const key = useMemo(
    () => JSON.stringify({ currentTab, currentQuery, currentFilters }),
    [currentTab, currentQuery, currentFilters]
  )

  if (search.isFetching || !communities) return <></>

  return (
    <Container key={key} className="fr-mt-5w">
      <table style={{ fontSize: 12 }} width={"100%"}>
        <tr>
          <th>Community</th>
          <th>Size</th>
          <th>Top element</th>
          <th>Last activity</th>
        </tr>
        {communities.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.label}</td>
              <td>{val.size}</td>
              <td>{val.maxWeightNodes.join(", ")}</td>
              <td>{val.maxYear}</td>
            </tr>
          )
        })}
      </table>
    </Container>
  )
}
