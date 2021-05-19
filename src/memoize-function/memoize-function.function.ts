import { DefaultStorage } from "../default-storage/default-storage.class";
import { generateCacheKey } from "../generate-cache-key/generate-cache-key.function";

import { Storage } from "../default-storage/default-storage.type";

export const memoizeFunction = <
  ResultFunction extends (
    this: any,
    ...args: any[]
  ) => ReturnType<ResultFunction>
>(
  callback: ResultFunction,
  storage: Storage<ReturnType<ResultFunction>> = new DefaultStorage<
    ReturnType<ResultFunction>
  >()
) => {
  interface CacheHelpers {
    storage: Storage<ReturnType<ResultFunction>>;
  }

  type ResultType = ResultFunction & CacheHelpers;

  const memoize = (...args: any[]): ReturnType<ResultFunction> => {
    const cacheKey = generateCacheKey(...args);
    const cachedValue = storage.getItem(cacheKey);

    if (!cachedValue) {
      const result = callback.apply(this, args);
      storage.setItem(cacheKey, result);

      return result;
    }

    return cachedValue;
  };

  const parsedMemoize = memoize as ResultType;

  parsedMemoize.storage = storage;

  return parsedMemoize;
};
