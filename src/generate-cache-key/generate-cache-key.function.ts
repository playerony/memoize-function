import { toString } from "../to-string/to-string.function";

export const generateCacheKey = (...args: any[]): string => {
  const prefix = "_";
  const suffix = "_";
  const joinString = "_";

  if (!args?.length) {
    return "";
  }

  const parsedArgs = args.map(toString);
  const joinedArgs = parsedArgs.join(joinString);

  return `${prefix}${joinedArgs}${suffix}`;
};
