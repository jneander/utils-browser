export class LocalStorage {
  public scope: string

  constructor(scope = '') {
    this.scope = scope
  }

  buildKey(key: string): string {
    return this.scope ? `${this.scope}:${key}` : key
  }

  getJson<T = unknown>(key: string): T | undefined
  getJson<T = unknown>(key: string, defaultValue: T): T
  getJson<T = unknown>(key: string, defaultValue?: T): T | undefined
  getJson<T = unknown>(key: string, defaultValue?: T): T | undefined {
    if (this.buildKey(key) in localStorage) {
      return JSON.parse(localStorage[this.buildKey(key)])
    }
    return defaultValue
  }

  getString(key: string): string | undefined
  getString(key: string, defaultValue: string): string
  getString(key: string, defaultValue?: string): string | undefined
  getString(key: string, defaultValue?: string): string | undefined {
    if (this.buildKey(key) in localStorage) {
      return localStorage[this.buildKey(key)]
    }
    return defaultValue
  }

  setJson(key: string, value: unknown): void {
    if (typeof value === 'undefined') {
      this.removeData(key)
    } else {
      localStorage.setItem(this.buildKey(key), JSON.stringify(value))
    }
  }

  setString(key: string, value?: string): void {
    if (typeof value === 'undefined') {
      this.removeData(key)
    } else {
      localStorage.setItem(this.buildKey(key), value)
    }
  }

  removeData(key: string): void {
    localStorage.removeItem(this.buildKey(key))
  }
}
