import { getControlDefaults, type ControlRecord, type ControlProp as ControlValue } from "@zag-js/shared"
import type { ComputedRef, UnwrapRef } from "vue"

export interface UseControlsReturn<U extends object, T extends ControlRecord<U>> {
  config: T
  context: Ref<UnwrapRef<ControlValue<T>>>
  setState: (key: string, value: any) => void
  getState: (key: string) => any
  keys: (keyof T)[]
  mergeProps: <P>(props: P) => ComputedRef<ControlValue<T> & P>
}

export const useControls = <U extends object, T extends ControlRecord<U>>(config: T): UseControlsReturn<U, T> => {
  const state = ref(getControlDefaults(config))

  const setState = (key: string, value: any) => {
    const newState = toValue(state)
    deepSet(newState, key, value)
    state.value = newState
  }

  const getState = (key: string) => {
    return deepGet(toValue(state), key)
  }

  return {
    config,
    context: state,
    setState,
    getState,
    keys: Object.keys(config) as (keyof ControlValue<T>)[],
    mergeProps: <P>(props: P): ComputedRef<ControlValue<T> & P> => {
      return computed(() => ({
        ...toValue(state),
        ...props,
      }))
    },
  }
}
