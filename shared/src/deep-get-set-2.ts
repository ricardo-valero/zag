// export const deepSet = <T extends Record<string, any>>(obj: T, path: string, value: any) => {
//   const parts = path.split(".")

//   const last = parts.pop()
//   if (!last) return

//   const parent = parts.reduce<any>((acc, key) => {
//     if (!acc[key]) acc[key] = {}
//     return acc[key]
//   }, obj)

//   parent[last] = value
// }

// export const deepGet = <T extends Record<string, any>>(obj: T, path: string) => {
//   const parts = path.split(".")

//   return parts.reduce<any>((obj, key) => {
//     if (!obj) return
//     return obj[key]
//   }, obj)
// }
//

// Helper for dot notation paths
export function get<T extends Record<string, any>, P extends string>(obj: T, path: P): TypeAt<T, Split<P, ".">> {
  return deepGet(obj, path.split("."))
}

// Type helper to split a string
type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S]

type DeepKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string ? (T[K] extends object ? K | `${K}.${DeepKeyOf<T[K]>}` : K) : never
    }[keyof T]
  : never

type DeepPathArray<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? [K, ...DeepPathArray<T[K], Rest>]
    : [P]
  : P extends keyof T
    ? [P]
    : [P]

export type PathsOf<T> = T extends object ? { [K in keyof T]: [K] | [K, ...PathsOf<T[K]>] }[keyof T] : never

export type TypeAt<T, P extends unknown[]> = P extends [infer First, ...infer Rest]
  ? First extends keyof T
    ? Rest["length"] extends 0
      ? T[First]
      : TypeAt<T[First], Rest>
    : never
  : T

export type DeepSetParams<T extends object> = [obj: T, path: PathsOf<T>, value: TypeAt<T, PathsOf<T>>]

// function updatePath<T extends object, const P extends DeepPath<T>>(obj: T, path: P, value: TypeAt<T, P>): void {
//   if (path.length === 0) return
//   const [first, ...rest] = path
//   if (rest.length === 0) obj[first] = value as T[typeof first]
//   const nested = obj[first]
//   if (nested && typeof nested === "object")
//     updatePath(nested, rest as DeepPath<typeof nested>, value as TypeAt<typeof nested, DeepPath<typeof nested>>)
// }

export function deepGet<T, P extends ReadonlyArray<string | number | symbol>>(
  obj: T,
  path: P & PathsOf<T>,
): TypeAt<T, P & PathsOf<T>> {
  let result: any = obj
  for (const key of path) {
    if (result === undefined || result === null) {
      return undefined as any
    }
    result = result[key]
  }
  return result as TypeAt<T, P & PathsOf<T>>
}

export function deepSet<T, const P extends PathsOf<T>>(obj: T, path: P, value: TypeAt<T, P>): void {
  if (path.length === 0) return
  const [first, ...rest] = path
  if (rest.length === 0) {
    obj[first] = value as T[typeof first]
    return
  }
  const nested = obj[first]
  if (nested && typeof nested === "object") {
    deepSet(nested, rest as PathsOf<typeof nested>, value as TypeAt<typeof nested, PathsOf<typeof nested>>)
  }
  return
}

// using for loop
// function updatePath2<T, const P extends DeepPath<T>>(obj: T, path: P, value: TypeAt<T, P>): T {
//   if (path.length === 0) return obj
//   let current: T | T[keyof T] = obj
//   for (let i = 0; i < path.length - 1; i++) {
//     const key = path[i] as keyof typeof current
//     current = current[key]
//   }
//   const lastKey = path[path.length - 1] as keyof typeof current
//   current[lastKey] = value as (typeof current)[typeof lastKey]
//   return obj
// }

// Examples

type Data = {
  user: {
    profile: {
      name: string
      age: number
      address: {
        street: string
        city: string
        location: {
          lat: number
          lng: number
        }
      }
      contacts: string[]
    }
    active: boolean
  }
}

const data: Data = {
  user: {
    profile: {
      name: "Alice",
      age: 30,
      address: {
        street: "123 Main St",
        city: "New York",
        location: {
          lat: 40.7128,
          lng: -74.006,
        },
      },
      contacts: ["email@example.com"],
    },
    active: true,
  },
}

// @ts-expect-error
const nme = deepGet(data, ["nme"])

// this is ok and should expect string
const name = deepGet(data, ["user", "profile", "name"])

// @ts-expect-error
deepSet(data, ["user", "profile", "address", "city"], 3)

// this is ok and should expect string
deepSet(data, ["user", "profile", "address", "city"], "mty")
