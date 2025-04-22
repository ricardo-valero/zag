import { getControlDefaults, type ControlRecord, deepSet } from "@zag-js/shared"

export function useControls<T>(config: ControlRecord<T>) {
  const context = $state(getControlDefaults(config))

  const controls = {
    get config() {
      return config
    },
    get context() {
      return context
    },
    setContext<V>(key: string, value: V) {
      deepSet(context, key, value)
    },
  }

  return controls
}

export type UseControlsReturn<T> = ReturnType<typeof useControls<T>>
