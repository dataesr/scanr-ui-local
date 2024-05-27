import { useMemo } from "react"
import { Container } from "@dataesr/dsfr-plus"
import { NetworkData } from "../../../types/network"
import useSearchData from "../hooks/useSearchData"
import useUrl from "../../search/hooks/useUrl"
import BaseSkeleton from "../../../components/skeleton/base-skeleton"

export default function ClustersTable({ currentTab, enabled }: { currentTab: string; enabled: boolean }) {
  const { currentQuery, currentFilters } = useUrl()
  const { search } = useSearchData(currentTab, enabled)
  const network = search?.data?.network as NetworkData
  const communities = network?.clusters
  const key = useMemo(
    () => JSON.stringify({ currentTab, currentQuery, currentFilters, enabled }),
    [currentTab, currentQuery, currentFilters, enabled]
  )

  if (!enabled) return null

  if (search.isFetching) return <BaseSkeleton width="100%" height="30rem" className="fr-my-1v" />

  return (
    <Container fluid className="fr-table fr-mt-5w fr-table--layout-fixed fr-table--blue-ecume" key={key}>
      <table style={{ width: "100%" }}>
        <colgroup>
          <col span={1} style={{ width: "20%" }} />
          <col span={1} style={{ width: "5%" }} />
          <col span={1} style={{ width: "35%" }} />
          <col span={1} style={{ width: "12%" }} />
          <col span={1} style={{ width: "5%" }} />
          <col span={1} style={{ width: "12%" }} />
          <col span={1} style={{ width: "10%" }} />
        </colgroup>

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
              <tr>
                <td>{community.label}</td>
                <td>{community.size}</td>
                <td>
                  {community?.domains
                    ? Object.entries(community.domains)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 10)
                        .map(([domain]) => `${domain}`)
                        .join(", ")
                    : ""}
                </td>
                <td>{community.maxWeightNodes.join(", ")}</td>
                <td>{community.hits}</td>
                <td>{community?.oaPercent ? `${community.oaPercent.toFixed(1)} %` : ""}</td>
                <td>{community.maxYear}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
    </Container>
  )
}
