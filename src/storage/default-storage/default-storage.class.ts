import { Storage } from "../shared";
import { Cache } from "./default-storage.type";

export class DefaultStorage<CacheValue> implements Storage<CacheValue> {
  private cache!: Cache<CacheValue>;

  constructor() {
    this.cache = {};
  }

  public clear(): void {
    this.cache = {};
  }

  public getItem(key: string): CacheValue | null {
    return this.cache[key] || null;
  }

  public key(index: number): string | null {
    const cacheKeys = Object.keys(this.cache);

    return cacheKeys[index] || null;
  }

  public removeItem(key: string): void {
    delete this.cache[key];
  }

  public setItem(key: string, value: CacheValue): void {
    this.cache[key] = value;
  }

  public length(): number {
    return Object.keys(this.cache).length;
  }
}
