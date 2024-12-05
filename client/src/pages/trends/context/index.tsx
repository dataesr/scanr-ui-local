import { useContext, createContext, useState } from "react"
import { TRENDS_VIEWS } from "../config/views"

const Context = createContext(null)

export function useTrendsContext() {
  return useContext(Context)
}

export function TrendsContext({ children }) {
  const [view, setView] = useState<string>(TRENDS_VIEWS[0].id)
  const [model, setModel] = useState<string>("entity-fishing")
  const [source, setSource] = useState<string>("publications")
  const [normalized, setNormalized] = useState<boolean>(true)
  const [focus, setFocus] = useState<string>("")

  return (
    <Context.Provider
      value={{ view, setView, source, setSource, model, setModel, normalized, setNormalized, focus, setFocus }}
    >
      {children}
    </Context.Provider>
  )
}
