import { Storage } from "../storage/shared";

export interface MemoizeFunctionObject<ResultType> {
  storage: Storage<ResultType>;
}

export interface Options<ResultType> {
  storage?: Storage<ResultType>;
  generateCacheKey?: (...args: any[]) => string;
}
