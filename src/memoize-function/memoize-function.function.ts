import { generateCacheKey } from "../generate-cache-key/generate-cache-key.function";

export const memoizeFunction = <
  ResultFunction extends (...args: any[]) => ReturnType<ResultFunction>
>(
  callback: ResultFunction
) => {
  type Cache = { [key: string]: ReturnType<ResultFunction> };

  const cache: Cache = {};

  const memoize = (...args: any[]): ReturnType<ResultFunction> => {
    const cacheKey = generateCacheKey(...args);
    const cachedValue = cache[cacheKey];

    if (!cachedValue) {
      const result = callback(...args);
      cache[cacheKey] = result;

      return result;
    }

    console.log(cache);
    return cachedValue;
  };

  return memoize as ResultFunction;
};
