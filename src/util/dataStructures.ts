
export class DefaultDict<K, V> extends Map<K, V> {
  defaultVal: (() => V) | V

  get (key: K): V {
    const defaultVal = this.defaultVal instanceof Function ? this.defaultVal() : this.defaultVal
    if (!this.has(key)) {
      this.set(key, defaultVal)
    }
    return super.get(key) as V
  }

  constructor (defaultVal: V | (() => V), entries: Iterable<readonly [K, V]> | null | undefined = undefined) {
    super(entries)
    this.defaultVal = defaultVal
  }
}

// Map recipes to ingredients
export class RecipeMap extends DefaultDict<string, Set<string>> {
  constructor (entries: Iterable<readonly [string, Set<string>]> | null | undefined = undefined) {
    super(() => new Set(), entries)
  }
}
