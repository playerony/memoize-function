import { Cache, Storage } from "./default-storage.type";

export class DefaultStorage<CacheItem> implements Storage<CacheItem> {
  private cache!: Cache<CacheItem>;

  constructor() {
    this.cache = {};
  }

  clear(): void {
    this.cache = {};
  }

  getItem(key: string): CacheItem | null {
    return this.cache[key] || null;
  }

  key(index: number): string | null {
    const cacheKeys = Object.keys(this.cache);

    return cacheKeys[index] || null;
  }

  removeItem(key: string): void {
    delete this.cache[key];
  }

  setItem(key: string, value: CacheItem): void {
    this.cache[key] = value;
  }

  length(): number {
    return Object.keys(this.cache).length;
  }
}
