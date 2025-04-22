/* eslint-disable jsx-a11y/no-onchange */
import {
  ControlRecord,
  deepSet,
  getControlDefaults,
  ControlProp,
  entriesFromObject,
  PathOf,
  TypeAt,
} from "@zag-js/shared"
import { useState } from "react"
import { ControlsProvider, useControlsContext } from "./controls-context"

export function useControls<T>(config: ControlRecord<T>) {
  const [state, setState] = useState(getControlDefaults(config))
  const setValue = (path: PathOf<T>, value: TypeAt<T, PathOf<T>>) =>
    setState((s) => {
      const newState = structuredClone(s)
      deepSet(newState, path, value)
      return newState
    })

  return {
    context: state,
    ui: () => (
      <ControlsProvider<typeof state> value={{ state, setValue }}>
        <ControlTree config={config} />
      </ControlsProvider>
    ),
  }
}

function ControlTree<T>({ config, path }: { config: ControlRecord<T>; path?: PathOf<T> }) {
  const { setValue } = useControlsContext<T>()
  return (
    <div className="controls-container">
      {entriesFromObject(config).map(([key, prop]) => {
        const currentPath = path ? `${path}.${key.toString()}` : key.toString()
        if (!("type" in prop)) {
          return (
            <div key={key.toString()}>
              <label>{key.toString()}</label>
              <ControlTree config={prop} path={currentPath} />
            </div>
          )
        }
        return (
          <ControlField
            key={key.toString()}
            id={key.toString()}
            prop={prop}
            onChange={(value) => setValue(currentPath, value)}
          />
        )
      })}
    </div>
  )
}

function ControlField<T>({
  id,
  prop,
  onChange,
}: {
  id: string
  prop: ControlProp<T>
  onChange: (value: T[keyof T]) => void
}) {
  const label = prop.label ?? id
  switch (prop.type) {
    case "boolean":
      return (
        <div key={label} className="checkbox">
          <input
            data-testid={id}
            id={label}
            type="checkbox"
            defaultChecked={prop.defaultValue}
            onChange={(e) => {
              onChange(e.target.checked)
            }}
          />
          <label htmlFor={label}>{label}</label>
        </div>
      )
    case "string":
      return (
        <div key={label} className="text">
          <label style={{ marginRight: "10px" }}>{label}</label>
          <input
            data-testid={id}
            type="text"
            placeholder={label}
            defaultValue={prop.defaultValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onChange(e.currentTarget.value)
              }
            }}
          />
        </div>
      )
    case "number":
      return (
        <div key={label} className="text">
          <label htmlFor={label} style={{ marginRight: "10px" }}>
            {label}
          </label>
          <input
            data-testid={id}
            id={label}
            type="number"
            defaultValue={prop.defaultValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = parseFloat(e.currentTarget.value)
                onChange(isNaN(val) ? 0 : val)
              }
            }}
          />
        </div>
      )
    case "select":
      return (
        <div key={label} className="text">
          <label htmlFor={label} style={{ marginRight: "10px" }}>
            {label}
          </label>
          <select
            data-testid={id}
            id={label}
            defaultValue={prop.defaultValue}
            onChange={(e) => {
              onChange(e.target.value)
            }}
          >
            <option>-----</option>
            {prop.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )
  }
}
