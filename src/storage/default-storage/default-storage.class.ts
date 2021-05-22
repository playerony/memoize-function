import { ObjectCache, Storage } from "./default-storage.type";

export class DefaultStorage<CacheValue> implements Storage<CacheValue> {
  private cache!: ObjectCache<CacheValue>;

  constructor() {
    this.cache = {};
  }

  public clear(): void {
    this.cache = {};
  }

  public remove(key: string): void {
    delete this.cache[key];
  }

  public get(key: string): CacheValue | null {
    return this.cache[key] || null;
  }

  public set(key: string, value: CacheValue): void {
    this.cache[key] = value;
  }
}
