import { isPrimitive } from "../is-primitive/is-primitive.function";

export const toString = (value: unknown): string => {
  if (isPrimitive(value)) {
    return String(value);
  }

  if (typeof value === "function") {
    const functionBody = value.toString();

    return functionBody.replace(/\s/g, "");
  }

  return JSON.stringify(value);
};
