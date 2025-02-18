import { useContext, createContext, useState } from "react"
import { TRENDS_RANKING_SORTS_MAPPING } from "../config/sorting"

const Context = createContext(null)

export function useTrendsContext() {
  return useContext(Context)
}

export function TrendsContext({ children }) {
  const [sort, setSort] = useState<string>(TRENDS_RANKING_SORTS_MAPPING[0].id)
  const [focus, setFocus] = useState<string>("")
  const [includes, setIncludes] = useState<string>("")
  return <Context.Provider value={{ sort, setSort, focus, setFocus, includes, setIncludes }}>{children}</Context.Provider>
}
