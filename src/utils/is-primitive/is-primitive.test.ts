import { isPrimitive } from "./is-primitive.function";

describe("isPrimitive", () => {
  it("should return true if the passed parameter is a primitive one", () => {
    expect(isPrimitive(1)).toBeTruthy();
    expect(isPrimitive(NaN)).toBeTruthy();
    expect(isPrimitive(null)).toBeTruthy();
    expect(isPrimitive("string")).toBeTruthy();
    expect(isPrimitive(Infinity)).toBeTruthy();
    expect(isPrimitive(undefined)).toBeTruthy();
    expect(isPrimitive(Symbol.iterator)).toBeTruthy();
  });

  it("should return false if the passed parameter is not a primitive one", () => {
    class TestClass {}

    expect(
      isPrimitive(() => {
        return 5;
      })
    ).toBeFalsy();
    expect(isPrimitive({})).toBeFalsy();
    expect(isPrimitive([])).toBeFalsy();
    expect(isPrimitive(TestClass)).toBeFalsy();
    expect(isPrimitive(new TestClass())).toBeFalsy();
  });
});
