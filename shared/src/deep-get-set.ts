// export type TypeAt<T, P extends unknown[]> = P extends [infer First, ...infer Rest]
//   ? First extends keyof T
//     ? Rest["length"] extends 0
//       ? T[First]
//       : TypeAt<T[First], Rest>
//     : never
//   : T

// Split a string by delimiter
type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S]

// Get the value type at a specific path
type Get<T, P extends string[]> = P extends []
  ? T
  : P extends [infer F, ...infer R]
    ? F extends keyof T
      ? R extends string[]
        ? Get<T[F], R>
        : never
      : never
    : never

// All valid dot-notated paths of an object
export type PathOf<T> = {
  [K in keyof T & string]: K | (T[K] extends object ? `${K}.${PathOf<T[K]>}` : never)
}[keyof T & string]

// Type at a specific path
export type TypeAt<T, P extends string> = Get<T, Split<P, ".">>

// export const deepSet = <T, P extends PathOf<T>>(obj: T, path: P, value: TypeAt<T, P>) => {
export const deepSet = <T, V>(obj: T, path: string, value: V) => {
  const parts = path.split(".")

  const last = parts.pop()
  if (!last) return

  const parent = parts.reduce<any>((acc, key) => {
    if (!acc[key]) acc[key] = {}
    return acc[key]
  }, obj)

  parent[last] = value
}

export const deepGet = <T>(obj: T, path: string) => {
  const parts = path.split(".")

  return parts.reduce<any>((obj, key) => {
    if (!obj) return
    return obj[key]
  }, obj)
}

export const deepExpand = <T extends Record<string, unknown>>(obj: T) => {
  const result: T = {} as any

  for (const key in obj) {
    const value = obj[key]
    if (value == null) continue
    deepSet(result, key, obj[key] as any)
  }

  return result
}
