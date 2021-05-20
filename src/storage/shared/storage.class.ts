export abstract class Storage<CacheValue> {
  public abstract clear: () => void;
  public abstract length: () => number;
  public abstract removeItem: (key: string) => void;
  public abstract key: (index: number) => string | null;
  public abstract getItem: (key: string) => CacheValue | null;
  public abstract setItem: (key: string, value: CacheValue) => void;
}
