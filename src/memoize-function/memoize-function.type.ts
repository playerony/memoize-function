import { Storage } from "../storage";

export interface MemoizeFunctionObject<ResultType> {
  storage: Storage<ResultType>;
}

export type ResultType<
  ResultFunction extends (
    this: any,
    ...args: any[]
  ) => ReturnType<ResultFunction>
> = ResultFunction & MemoizeFunctionObject<ReturnType<ResultFunction>>;

export interface Options<ResultType> {
  storage?: Storage<ResultType>;
  generateCacheKey?: (...args: any[]) => string;
}
