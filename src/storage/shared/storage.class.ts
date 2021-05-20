export abstract class Storage<CacheItem> {
  public abstract clear: () => void;
  public abstract length: () => number;
  public abstract removeItem: (key: string) => void;
  public abstract key: (index: number) => string | null;
  public abstract getItem: (key: string) => CacheItem | null;
  public abstract setItem: (key: string, value: CacheItem) => void;
}
