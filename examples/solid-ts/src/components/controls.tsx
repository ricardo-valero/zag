/* eslint-disable jsx-a11y/no-onchange */
import { ControlRecord, deepSet, PathOf, TypeAt } from "@zag-js/shared"
import { For, Show } from "solid-js"
import { ControlProvider, useControlContext } from "~/hooks/controls-context"
import { UseControlsReturn } from "~/hooks/use-controls"

export function Controls<T extends object>(props: { store: UseControlsReturn<T> }) {
  const { state, setState, config } = props.store
  const setValue = <V,>(path: string, value: V) =>
    setState((prev) => {
      const next = structuredClone(prev)
      deepSet(next, path as PathOf<T>, value as TypeAt<T, PathOf<T>>)
      return next
    })
  return (
    <ControlProvider<typeof state> value={{ state, setValue }}>
      <ControlTree config={config} />
    </ControlProvider>
  )
}

function ControlTree<T>(props: { config: ControlRecord<T>; path?: string }) {
  const { setValue } = useControlContext<T>()
  return (
    <Show when={props.config}>
      {(config) => (
        <div class="controls-container">
          <For each={Object.entries(config()) as [keyof T, ControlRecord<T>[keyof T]][]}>
            {([k, value]) => {
              const key = k.toString()
              const path = props.path ? `${props.path}.${key}` : key
              if (!value) return
              if (!("type" in value)) {
                return (
                  <div>
                    <label>{key}</label>
                    <ControlTree config={value} path={path} />
                  </div>
                )
              }

              switch (value.type) {
                case "boolean":
                  return (
                    <div class="checkbox">
                      <input
                        data-testid={path}
                        id={path}
                        type="checkbox"
                        checked={value.defaultValue}
                        onChange={(e) => {
                          setValue(path, e.currentTarget.checked)
                        }}
                      />
                      <label for={path}>{key}</label>
                    </div>
                  )
                case "string":
                  return (
                    <div class="text">
                      <label for={path} style={{ "margin-right": "10px" }}>
                        {key}
                      </label>
                      <input
                        data-testid={path}
                        id={path}
                        type="text"
                        placeholder={key}
                        value={value.defaultValue}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setValue(path, e.currentTarget.value)
                          }
                        }}
                      />
                    </div>
                  )
                case "select":
                  return (
                    <div class="text">
                      <label for={path} style={{ "margin-right": "10px" }}>
                        {key}
                      </label>
                      <select
                        data-testid={path}
                        id={path}
                        value={value.defaultValue}
                        onChange={(e) => {
                          setValue(path, e.currentTarget.value)
                        }}
                      >
                        <option>-----</option>
                        <For each={value.options}>{(option) => <option value={option}>{option}</option>}</For>
                      </select>
                    </div>
                  )
                case "number":
                  return (
                    <div class="text">
                      <label for={path} style={{ "margin-right": "10px" }}>
                        {key}
                      </label>
                      <input
                        data-testid={path}
                        id={path}
                        type="number"
                        value={value.defaultValue}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const val = parseFloat(e.currentTarget.value)
                            setValue(path, isNaN(val) ? 0 : val)
                          }
                        }}
                      />
                    </div>
                  )
              }
            }}
          </For>
        </div>
      )}
    </Show>
  )
}
