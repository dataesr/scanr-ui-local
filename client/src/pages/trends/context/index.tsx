import { useContext, createContext, useState } from "react"
import { TRENDS_VIEWS } from "../config/views"

const Context = createContext(null)

export function useTrendsContext() {
  return useContext(Context)
}

export function TrendsContext({ children }) {
  const [view, setView] = useState<string>(TRENDS_VIEWS[0].id)
  const [focus, setFocus] = useState<string>("")
  const [normalized, setNormalized] = useState<boolean>(true)

  return (
    <Context.Provider value={{ view, setView, focus, setFocus, normalized, setNormalized }}>{children}</Context.Provider>
  )
}
