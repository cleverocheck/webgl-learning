declare interface ObjectConstructor {
  keys<T extends object>(o: T): (keyof T)[]
  entries<T extends object>(o: T): [keyof T, T[keyof T]][]
}
