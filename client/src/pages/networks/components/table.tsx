import { useMemo } from "react"
import { Container, Accordion } from "@dataesr/dsfr-plus"
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
      <Accordion title="Communities features">
        <table style={{ fontSize: 12 }} width={"100%"}>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Top keyword(s)</th>
            <th>Top element(s)</th>
            <th>Top publication(s)</th>
            <th>Open Access</th>
            <th>Last activity</th>
          </tr>
          {communities.map((community, index) => {
            return (
              <tr key={index}>
                <td>{community.label}</td>
                <td>{community.size}</td>
                <td>
                  {community?.domains
                    ? Object.entries(community.domains)
                        .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
                        .slice(0, 5)
                        .map(([domain]) => `${domain}`)
                        .join(", ")
                    : ""}
                </td>
                <td>{community.maxWeightNodes.join(", ")}</td>
                <td>{community?.topHits ? community.topHits : 0}</td>
                <td>{community?.oaPercent ? `${community.oaPercent.toFixed(1)} %` : ""}</td>
                <td>{community.maxYear}</td>
              </tr>
            )
          })}
        </table>
      </Accordion>
    </Container>
  )
}
