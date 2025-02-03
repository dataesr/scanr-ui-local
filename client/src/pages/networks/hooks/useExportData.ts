import { useCallback, useMemo, useState } from "react"
import useSearchData from "./useSearchData"
import { NetworkData } from "../../../types/network"
import * as XLSX from "xlsx"
import useOptions from "./useOptions"

function stringToArrayBuffer(string: string) {
  const buffer = new ArrayBuffer(string.length)
  const view = new Uint8Array(buffer)
  for (let i = 0; i < string.length; i++) view[i] = string.charCodeAt(i) & 0xff
  return buffer
}

const XSLXFormatter = (network: any) => {
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(network.items), "Items")
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(network.links), "Links")
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(
      network.clusters.map((cluster) => {
        const _cluster = { ...cluster }
        delete _cluster.publications
        return _cluster
      })
    ),
    "Clusters"
  )

  const publicationsList = network.clusters?.reduce((acc, cluster) => {
    cluster?.publications.forEach((publication) => {
      acc = [
        ...acc,
        {
          id: publication.id,
          title: publication.title,
          citationsCount: publication?.citationsCount,
          citationsRecent: publication?.citationsRecent,
          cluster: cluster.id,
          clusterLabel: cluster.label,
        },
      ]
    })
    return acc
  }, [])
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(publicationsList), "Publications")

  const workbookOutput = XLSX.write(workbook, { type: "binary", bookType: "xlsx" })
  return new Blob([stringToArrayBuffer(workbookOutput)], { type: "application/octet-stream" })
}

const JSONFormatter = (network: any) => {
  return new Blob([JSON.stringify(network, null, 2)], { type: "application/json" })
}

const exporter = (format: string) => (format === "xlsx" ? XSLXFormatter : JSONFormatter)

const exportNetwork = (network: NetworkData) => ({
  items: network.items.map((item) => ({
    id: item.id,
    label: item.label || "",
    cluster: item.cluster,
    ...(network.clusters.length && {
      clusterLabel: network.clusters.find((cluster) => cluster.cluster === item.cluster).label,
    }),
    documentsCount: item?.documentsCount,
    citationsCount: item?.citationsCount,
    citationsRecent: item?.citationsRecent,
    citationsScore: item?.citationsScore,
    degree: item?.weights?.Degree,
    weight: item?.weights?.Weight,
  })),
  links: network.links,
  clusters: network.clusters.map((cluster) => ({
    id: cluster.cluster,
    label: cluster.label,
    nodesCount: cluster.nodes.length,
    documentsCount: cluster?.documentsCount,
    citationsCount: cluster?.citationsCount,
    citationsRecent: cluster?.citationsRecent,
    citationsScore: cluster?.citationsScore,
    documents: cluster?.documents,
  })),
})

export default function useExportData() {
  const { currentModel } = useOptions()
  const { search } = useSearchData()
  const [isLoading, setIsLoading] = useState(false)

  const exportFile = useCallback(
    async (format: "json" | "xlsx") => {
      setIsLoading(true)
      const network = exportNetwork(search?.data?.network)
      const blob = exporter(format)(network)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `network.${currentModel}.${format}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      setIsLoading(false)
    },
    [currentModel, search]
  )

  const values = useMemo(() => {
    return { isExporting: isLoading, exportFile }
  }, [isLoading, exportFile])
  return values
}
