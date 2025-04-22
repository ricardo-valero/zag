import { PathOf, TypeAt } from "@zag-js/shared"
import { createContext, ProviderProps, useContext } from "react"

type ControlsContextValue<T> = {
  state: T
  setValue: (path: PathOf<T>, value: TypeAt<T, PathOf<T>>) => void
}

const ControlsContext = createContext<ControlsContextValue<any>>(undefined)

export function ControlsProvider<T>(props: ProviderProps<ControlsContextValue<T>>) {
  return <ControlsContext.Provider {...props} />
}

export function useControlsContext<T>() {
  const context = useContext<ControlsContextValue<T>>(ControlsContext)
  if (!context) throw new Error("No context provided")
  return context
}
