import { DefaultStorage } from "../storage/default-storage/default-storage.class";
import { generateCacheKey as generateCacheKeyDefault } from "../generate-cache-key/generate-cache-key.function";

import { Storage } from "../storage/shared/storage.class";

interface CacheHelpers<ResultType> {
  storage: Storage<ResultType>;
}

interface Options<ResultType> {
  storage?: Storage<ResultType>;
  generateCacheKey?: (...args: any[]) => string;
}

export const memoizeFunction = <
  ResultFunction extends (
    this: any,
    ...args: any[]
  ) => ReturnType<ResultFunction>
>(
  callback: ResultFunction,
  options: Options<ReturnType<ResultFunction>> = {}
) => {
  type ResultType = ResultFunction & CacheHelpers<ReturnType<ResultFunction>>;

  const {
    generateCacheKey = generateCacheKeyDefault,
    storage = new DefaultStorage<ReturnType<ResultFunction>>(),
  } = options;

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
