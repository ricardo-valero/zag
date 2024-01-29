import type { MachineSrc, StateMachine as S } from "@zag-js/core"
import { unstate } from "svelte"

export function useService<
  TContext extends Record<string, any>,
  TState extends S.StateSchema,
  TEvent extends S.EventObject = S.AnyEventObject,
>(machine: MachineSrc<TContext, TState, TEvent>, options?: S.HookOptions<TContext, TState, TEvent>) {
  const { actions, context, state: hydratedState } = options ?? {}

  const service = typeof machine === "function" ? machine() : machine

  $effect(() => {
    service.setOptions({ actions: unstate(actions) })
  })

  $effect(() => {
    service.setContext(unstate(context))
  })

  $effect(() => {
    service.start(hydratedState)
    return service.stop
  })

  return service
}
