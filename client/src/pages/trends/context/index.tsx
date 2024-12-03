import { useContext, createContext, useState } from "react"
import { TRENDS_VIEWS } from "../config/views"

const Context = createContext(null)

export function useTrendsContext() {
  return useContext(Context)
}

export function TrendsContext({ children }) {
  const [view, setView] = useState(TRENDS_VIEWS[0])
  const [focus, setFocus] = useState("")

  return <Context.Provider value={{ view, setView, focus, setFocus }}>{children}</Context.Provider>
}
