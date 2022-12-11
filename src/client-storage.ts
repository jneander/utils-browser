export class ClientStorage {
  public scope: string

  constructor(scope = '') {
    this.scope = scope
  }

  buildKey(key: string): string {
    return this.scope ? `${this.scope}:${key}` : key
  }

  getData<T = unknown>(key: string, defaultValue?: T): T {
    if (this.buildKey(key) in localStorage) {
      return JSON.parse(localStorage[this.buildKey(key)])
    }
    return defaultValue
  }

  setData(key: string, value: unknown): void {
    if (typeof value === 'undefined') {
      this.removeData(key)
    } else {
      localStorage.setItem(this.buildKey(key), JSON.stringify(value))
    }
  }

  removeData(key: string): void {
    localStorage.removeItem(this.buildKey(key))
  }
}
