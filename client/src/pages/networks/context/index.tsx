import { useContext, createContext, useState } from "react"

const Context = createContext(null)

export function useNetworkContext() {
  return useContext(Context)
}

export function NetworkContext({ children }) {
  const [focusItem, setFocusItem] = useState("")
  const [openFilters, setOpenFilters] = useState(false)
  return <Context.Provider value={{ focusItem, setFocusItem, openFilters, setOpenFilters }}>{children}</Context.Provider>
}
