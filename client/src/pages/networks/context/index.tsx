import { useContext, createContext, useState } from "react"

const Context = createContext(null)

export function useNetworkContext() {
  return useContext(Context)
}

export function NetworkContext({ children }) {
  const [focusItem, setFocusItem] = useState("")
  return <Context.Provider value={{ focusItem, setFocusItem }}>{children}</Context.Provider>
}
