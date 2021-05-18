import { isPrimitive } from "../is-primitive/is-primitive.function";

export const toString = (arg: any): string => {
  if (isPrimitive(arg)) {
    return String(arg);
  }

  if (typeof arg === "function") {
    const functionBody = arg.toString();

    return functionBody.replace(/\s/g, "");
  }

  return JSON.stringify(arg);
};
