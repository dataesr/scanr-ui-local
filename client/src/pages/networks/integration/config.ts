import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

const url = "https://raw.githubusercontent.com/dataesr/bso-ui/main/src/config/locals.json"

export default function getBsoLocals() {
  const { data } = useQuery({
    queryKey: ["bso", "locals"],
    queryFn: () => fetch(url).then((response) => response.json()),
    throwOnError: false,
  })

  const values = useMemo(() => {
    return data
  }, [data])

  return values
}
