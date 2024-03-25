import { useCallback, useMemo, useState } from "react"
import useTab from "./useTab"
import useSearchData from "./useSearchData"
import { NetworkData } from "../../../types/network"

const isString = (x: any) => Object.prototype.toString.call(x) === "[object String]"

function csvify(rows: Array<any>, columns: Array<any>) {
  let csv = ""
  const delimiter = "\t"
  if (columns) {
    csv += columns.map((c) => c.trim().replace(/\t/g, " ")).join(delimiter)
    csv += "\r\n"
  }
  rows.forEach((row) => {
    const crow = row.map((value) => {
      if (isString(value)) {
        return value.replace(/\t/g, " ").replace(/\r/g, " ").replace(/\n/g, " ").replace(/\s\s+/g, " ").trim()
      }
      return value
    })
    csv += crow.join(delimiter)
    csv += "\r\n"
  })
  return csv
}

const CSVFormatter = (network: any) => {
  const cols = ["id", "label", "degree", "weight", "cluster"]
  const rows = network.items.map((item) => [item.id, item.label, item.degree, item.weight, item.cluster])
  return new Blob([csvify(rows, cols)], { type: "text/csv" })
}

const JSONFormatter = (network: any) => {
  return new Blob([JSON.stringify(network, null, 2)], { type: "application/json" })
}

const exporter = (format) => (format === "csv" ? CSVFormatter : JSONFormatter)

const exportNetwork = (network: NetworkData) => ({
  items: network.items.map((item) => ({
    id: item.id,
    label: item.label || "",
    degree: item?.weights?.Degree || null,
    weight: item?.weights?.Weight || null,
    cluster: item.cluster,
  })),
  links: network.links,
})

export default function useExportData() {
  const { currentTab } = useTab()
  const { search } = useSearchData(currentTab)
  const [isLoading, setIsLoading] = useState(false)

  const exportFile = useCallback(
    async (format: "csv" | "json") => {
      setIsLoading(true)
      const network = exportNetwork(search?.data?.network)
      const blob = exporter(format)(network)
      console.log("blob", blob)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `network.${currentTab}.${format}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      setIsLoading(false)
    },
    [currentTab, search]
  )

  const values = useMemo(() => {
    return { isExporting: isLoading, exportFile }
  }, [isLoading, exportFile])
  return values
}
