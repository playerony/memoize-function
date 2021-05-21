export interface Storage<CacheValue> {
  clear: () => void;
  remove: (key: string) => void;
  get: (key: string) => CacheValue | null;
  set: (key: string, value: CacheValue) => void;
}

export type Cache<CacheValue> = { [key: string]: CacheValue };
