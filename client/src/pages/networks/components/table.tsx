import { useMemo } from "react"
import { Container } from "@dataesr/dsfr-plus"
import { NetworkData } from "../../../types/network"
import useSearchClusters from "../hooks/useSearchClusters"

export default function ClustersTable({ currentTab, enabled }: { currentTab: string; enabled: boolean }) {
  const { search, currentQuery, currentFilters } = useSearchClusters(currentTab, enabled)
  const network = search?.data?.network as NetworkData
  const communities = network?.clusters
  const key = useMemo(
    () => JSON.stringify({ currentTab, currentQuery, currentFilters, enabled }),
    [currentTab, currentQuery, currentFilters, enabled]
  )

  if (!enabled || search.isFetching || !communities) return <></>

  return (
    <Container className="fr-mt-5w" key={key}>
      <table style={{ fontSize: 12 }} width={"100%"}>
        <thead>
          <th>Name</th>
          <th>Size</th>
          <th>Top keyword(s)</th>
          <th>Top element(s)</th>
          <th>Top publication(s)</th>
          <th>Open Access</th>
          <th>Last activity</th>
        </thead>
        {communities.map((community, index) => {
          return (
            <tbody key={index}>
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
              <td>{community?.publications ? community.publications : 0}</td>
              <td>{community?.oaPercent ? `${community.oaPercent.toFixed(1)} %` : ""}</td>
              <td>{community.maxYear}</td>
            </tbody>
          )
        })}
      </table>
    </Container>
  )
}
