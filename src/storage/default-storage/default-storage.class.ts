import { Cache } from "./default-storage.type";
import { Storage } from "../shared/storage.class";

export class DefaultStorage<CacheItem> implements Storage<CacheItem> {
  private cache!: Cache<CacheItem>;

  constructor() {
    this.cache = {};
  }

  public clear(): void {
    this.cache = {};
  }

  public getItem(key: string): CacheItem | null {
    return this.cache[key] || null;
  }

  public key(index: number): string | null {
    const cacheKeys = Object.keys(this.cache);

    return cacheKeys[index] || null;
  }

  public removeItem(key: string): void {
    delete this.cache[key];
  }

  public setItem(key: string, value: CacheItem): void {
    this.cache[key] = value;
  }

  public length(): number {
    return Object.keys(this.cache).length;
  }
}
