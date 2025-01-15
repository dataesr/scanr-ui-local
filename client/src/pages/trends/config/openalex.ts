// import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import data from "./openalex_topic_mapping_table.json"

export function getOpenAlexMapping() {
  // const { data } = useSuspenseQuery({
  //   queryKey: ["bso", "locals"],
  //   queryFn: () => fetch("./openalex_topic_mapping_table.json").then((response) => (response.ok ? response.json() : {})),
  // })

  const values = useMemo(() => {
    return data
  }, [data])

  return values
}
