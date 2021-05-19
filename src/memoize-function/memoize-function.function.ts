import { generateCacheKey } from "../generate-cache-key/generate-cache-key.function";

export const memoizeFunction = <
  ResultFunction extends (
    this: any,
    ...args: any[]
  ) => ReturnType<ResultFunction>
>(
  callback: ResultFunction
) => {
  interface CacheHelpers {
    get: () => Cache;
    clear: () => void;
    find: (key: string) => ReturnType<ResultFunction>;
    delete: (key: string) => ReturnType<ResultFunction>;
  }

  type ResultType = ResultFunction & CacheHelpers;
  type Cache = { [key: string]: ReturnType<ResultFunction> };

  let cache: Cache = {};

  const memoize = (...args: any[]): ReturnType<ResultFunction> => {
    const cacheKey = generateCacheKey(...args);
    const cachedValue = cache[cacheKey];

    if (!cachedValue) {
      const result = callback.apply(this, args);
      cache[cacheKey] = result;

      return result;
    }

    return cachedValue;
  };

  const parsedMemoize = memoize as ResultType;

  parsedMemoize.get = () => cache;

  parsedMemoize.find = (key: string) => cache[key];

  parsedMemoize.delete = (key: string) => {
    const cacheValue = cache[key];
    delete cache[key];

    return cacheValue;
  };

  parsedMemoize.clear = () => {
    cache = {};
  };

  return memoize as ResultType;
};
