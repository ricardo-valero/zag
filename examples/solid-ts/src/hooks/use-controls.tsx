import { ControlRecord, getControlDefaults } from "@zag-js/shared"
import { createSignal } from "solid-js"

export function useControls<T extends object>(config: ControlRecord<T>) {
  const [state, setState] = createSignal(getControlDefaults(config))
  return { state, setState, config }
}

export type UseControlsReturn<T extends object> = ReturnType<typeof useControls<T>>
