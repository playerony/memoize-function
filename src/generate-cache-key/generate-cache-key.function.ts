import { toString } from "../utils";

export const generateCacheKey = (...args: any[]): string => {
  const prefix = "[";
  const suffix = "]";
  const joinString = "_";

  if (!args?.length) {
    return "";
  }

  const parsedArgs = args.map(toString);
  const joinedArgs = parsedArgs.join(joinString);

  return `${prefix}${joinedArgs}${suffix}`;
};
