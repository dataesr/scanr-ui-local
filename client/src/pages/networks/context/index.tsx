import { useContext, createContext, useState } from "react"

const Context = createContext(null)

export function useNetworkContext() {
  return useContext(Context)
}

export function NetworkContext({ children }) {
  const [getStartedPage, setGetStartedPage] = useState(0)
  const [focusItem, setFocusItem] = useState("")
  const [openFilters, setOpenFilters] = useState(false)
  return (
    <Context.Provider value={{ focusItem, setFocusItem, openFilters, setOpenFilters, getStartedPage, setGetStartedPage }}>
      {children}
    </Context.Provider>
  )
}
