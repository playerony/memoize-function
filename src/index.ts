export {
  Options,
  ResultType,
  MemoizeFunctionObject,
} from "./memoize-function/memoize-function.type";
export { Storage, ObjectCache } from "./storage";

import { memoizeFunction } from "./memoize-function/memoize-function.function";

module.exports = memoizeFunction;
