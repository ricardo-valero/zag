import { createContext, useContext, ParentProps } from "solid-js"

type ControlContextValue<T> = {
  state: T
  setValue: <V>(path: string, value: V) => void
}

const ControlContext = createContext<ControlContextValue<any>>(undefined)

export function ControlProvider<T>(props: ParentProps<{ value: ControlContextValue<T> }>) {
  return <ControlContext.Provider value={props.value}>{props.children}</ControlContext.Provider>
}

export function useControlContext<T>() {
  const context = useContext(ControlContext) as ControlContextValue<T>
  if (!context) throw new Error("No context provided")
  return context
}
