export * from "./controls"
export * from "./data"
export * from "./deep-get-set"
export * from "./define-controls"
export * from "./routes"

// https://www.charpeni.com/blog/properly-type-object-keys-and-object-entries
type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][]

export function entriesFromObject<T extends object>(object: T): Entries<T> {
  return Object.entries(object) as Entries<T>
}
