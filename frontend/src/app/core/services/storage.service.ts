import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly PREFIX = 'ECOMMERCE_';

  setItem(key: string, value: any, useSessionStorage = false): void {
    const storage = useSessionStorage ? sessionStorage : localStorage;
    storage.setItem(`${this.PREFIX}${key}`, JSON.stringify(value));
  }

  getItem<T>(key: string, useSessionStorage = false): T | null {
    const storage = useSessionStorage ? sessionStorage : localStorage;
    const item = storage.getItem(`${this.PREFIX}${key}`);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string, useSessionStorage = false): void {
    const storage = useSessionStorage ? sessionStorage : localStorage;
    storage.removeItem(`${this.PREFIX}${key}`);
  }

  clear(useSessionStorage = false): void {
    const storage = useSessionStorage ? sessionStorage : localStorage;
    Object.keys(storage)
      .filter(key => key.startsWith(this.PREFIX))
      .forEach(key => storage.removeItem(key));
  }
}