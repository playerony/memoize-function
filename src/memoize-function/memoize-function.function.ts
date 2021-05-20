import { DefaultStorage } from "../storage/default-storage";
import { generateCacheKey as generateCacheKeyDefault } from "../generate-cache-key/generate-cache-key.function";

import { Options, MemoizeFunctionObject } from "./memoize-function.type";

export const memoizeFunction = <
  ResultFunction extends (
    this: any,
    ...args: any[]
  ) => ReturnType<ResultFunction>
>(
  callback: ResultFunction,
  options: Options<ReturnType<ResultFunction>> = {}
) => {
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

  type ResultType = ResultFunction &
    MemoizeFunctionObject<ReturnType<ResultFunction>>;

  const parsedMemoize = memoize as ResultType;

  parsedMemoize.storage = storage;

  return parsedMemoize;
};
