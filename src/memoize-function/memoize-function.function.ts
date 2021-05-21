import { DefaultStorage } from "../storage";
import { generateCacheKey as generateCacheKeyDefault } from "../generate-cache-key/generate-cache-key.function";

import { Options, ResultType } from "./memoize-function.type";

export const memoizeFunction = <
  ResultFunction extends (
    this: any,
    ...args: any[]
  ) => ReturnType<ResultFunction>
>(
  callback: ResultFunction,
  options: Options<ReturnType<ResultFunction>> = {}
): ResultType<ResultFunction> => {
  const {
    generateCacheKey = generateCacheKeyDefault,
    storage = new DefaultStorage<ReturnType<ResultFunction>>(),
  } = options;

  const memoize = (...args: any[]): ReturnType<ResultFunction> => {
    const cacheKey = generateCacheKey(...args);
    const cachedValue = storage.get(cacheKey);

    if (!cachedValue) {
      const result = callback.apply(this, args);
      storage.set(cacheKey, result);

      return result;
    }

    return cachedValue;
  };

  const parsedMemoize = memoize as ResultType<ResultFunction>;

  parsedMemoize.storage = storage;

  return parsedMemoize;
};
