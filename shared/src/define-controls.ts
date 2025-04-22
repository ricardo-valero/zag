type IsUnion<T, U = T> = [T] extends [never] ? false : T extends unknown ? ([U] extends [T] ? false : true) : never

type NonUndefined<T> = T extends undefined ? never : T
type WithDefault<T> = undefined extends T ? { defaultValue?: T } : { defaultValue: T }
type BooleanControl<T> = WithDefault<T> & { type: "boolean" }
type StringControl<T> = WithDefault<T> & { type: "string" }
type NumberControl<T> = WithDefault<T> & { type: "number" }
type SelectControl<T> = WithDefault<T> & { type: "select"; options: readonly T[] }
type MultiSelectControl<T> = WithDefault<T[]> & { type: "multiselect"; options: readonly T[] }

export type ControlProp<A> =
  NonUndefined<A> extends boolean
    ? BooleanControl<A>
    : NonUndefined<A> extends string
      ? string extends NonUndefined<A>
        ? StringControl<A> | SelectControl<A>
        : SelectControl<A>
      : NonUndefined<A> extends number
        ? number extends NonUndefined<A>
          ? NumberControl<A>
          : SelectControl<A>
        : NonUndefined<A> extends Array<infer U>
          ? SelectControl<U> | MultiSelectControl<U>
          : IsUnion<NonUndefined<A>> extends true
            ? SelectControl<A>
            : never

export type ControlRecord<T> = {
  [K in keyof T]?: NonUndefined<T[K]> extends object ? ControlRecord<NonUndefined<T[K]>> : ControlProp<T[K]>
}

export function defineControls<U, T = Partial<U>>(config: ControlRecord<T>) {
  return config
}

export function getControlDefaults<U, T = Partial<U>>(obj: ControlRecord<T>): T {
  if (!obj || typeof obj !== "object") {
    return {} as T
  }
  const result = {} as T
  for (const k of Object.keys(obj)) {
    const key = k as keyof T
    const prop = obj[key]
    if (!prop) continue
    if ("type" in prop) {
      if ("defaultValue" in prop) {
        result[key] = prop.defaultValue as T[keyof T]
      }
    } else if (typeof prop === "object") {
      const nestedDefaults = getControlDefaults(prop)
      if (Object.keys(nestedDefaults).length > 0) {
        result[key] = nestedDefaults as T[keyof T]
      }
    }
  }
  return result
}
