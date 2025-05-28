import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"

const url = "https://raw.githubusercontent.com/dataesr/bso-ui/main/src/config/locals.json"

export function useLocalConfig(local_id: string) {
  const { data } = useSuspenseQuery({
    queryKey: ["bso", "locals", local_id],
    queryFn: () => fetch(url).then((response) => (response.ok ? response.json() : {})),
  })

  const values = useMemo(() => {
    return data?.[local_id]
  }, [data, local_id])

  return values
}
