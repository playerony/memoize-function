import { memoizeFunction } from "./memoize-function.function";

type MultipleBy10Function = (value: number) => number;

describe("memoizeFunction", () => {
  describe("base usage", () => {
    let multipleBy10: MultipleBy10Function;
    let memoizedMultipleBy10: MultipleBy10Function;

    beforeEach(() => {
      multipleBy10 = jest
        .fn()
        .mockImplementation((value: number): number => value * 10);

      memoizedMultipleBy10 = memoizeFunction(multipleBy10);
    });

    it("should return a result of a function", () => {
      expect(memoizedMultipleBy10(5)).toEqual(50);
    });

    it("should return the same result if the arguments have not changed", () => {
      expect(memoizedMultipleBy10(10)).toBe(100);
      expect(memoizedMultipleBy10(10)).toBe(100);
    });

    it("should not execute the memoized function if the arguments have not changed", () => {
      memoizedMultipleBy10(6);
      memoizedMultipleBy10(6);

      expect(multipleBy10).toHaveBeenCalledTimes(1);
    });

    it("should cache all saved cases", () => {
      memoizedMultipleBy10(1);
      memoizedMultipleBy10(2);
      memoizedMultipleBy10(3);
      memoizedMultipleBy10(4);
      memoizedMultipleBy10(3);
      memoizedMultipleBy10(2);
      memoizedMultipleBy10(1);

      expect(multipleBy10).toHaveBeenCalledTimes(4);
    });
  });
});
