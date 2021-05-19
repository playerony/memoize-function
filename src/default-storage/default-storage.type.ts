export interface Storage<CacheItem> {
  clear: () => void;
  length: () => number;
  removeItem: (key: string) => void;
  key: (index: number) => string | null;
  getItem: (key: string) => CacheItem | null;
  setItem: (key: string, value: CacheItem) => void;
}

export type Cache<CacheResult> = { [key: string]: CacheResult };
