import { memoizeFunction } from "./memoize-function.function";

type Input = {
  lastname: string;
  firstname: string;
};

type MultipleBy10Function = (value: number) => number;
type GetFullNamesFunction = (input: Input[]) => string[];

describe("memoizeFunction", () => {
  describe("functions to manage cache", () => {
    let memoized = memoizeFunction((n: number) => n * 10);

    beforeEach(() => {
      memoized = memoizeFunction((n: number) => n * 10);
    });

    it("should contain length function to return amount of active elements", () => {
      memoized(10);
      memoized(40);
      memoized(70);

      expect(memoized.storage.length()).toEqual(3);
    });

    it("should contain getItem function to return item value by key", () => {
      memoized(10);
      memoized(40);

      expect(memoized.storage.getItem("")).toBeNull();
      expect(memoized.storage.getItem("[10]")).toEqual(100);
    });

    it("should contain setItem function to set item value", () => {
      memoized.storage.setItem("[10]", 100);
      expect(memoized.storage.getItem("[10]")).toEqual(100);
    });

    it("should contain removeItem function to remove an item by key", () => {
      memoized(10);
      memoized(40);

      memoized.storage.removeItem("[10]");
      expect(memoized.storage.length()).toEqual(1);
    });

    it("should contain key function to return key name by index", () => {
      memoized(10);
      memoized(40);

      expect(memoized.storage.key(2)).toBeNull();
      expect(memoized.storage.key(1)).toEqual("[40]");
    });

    it("should contain clear function to clear all cached values", () => {
      memoized(10);
      memoized(40);

      memoized.storage.clear();
      expect(memoized.storage.length()).toEqual(0);
    });
  });

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

  describe("normal usage", () => {
    let getFullNames: GetFullNamesFunction;
    let memoizedGetFullNames: GetFullNamesFunction;

    const inputData: Input[] = [
      {
        lastname: "456",
        firstname: "123",
      },
      {
        lastname: "def",
        firstname: "abc",
      },
    ];

    beforeEach(() => {
      getFullNames = jest
        .fn()
        .mockImplementation((inputs: Input[]): string[] =>
          inputs.map((_input) => `${_input.firstname} ${_input.lastname}`)
        );

      memoizedGetFullNames = memoizeFunction(getFullNames);
    });

    it("should return a result of a function", () => {
      expect(memoizedGetFullNames(inputData)).toEqual(["123 456", "abc def"]);
    });

    it("should return the same result if the arguments have not changed", () => {
      expect(memoizedGetFullNames(inputData)).toEqual(["123 456", "abc def"]);
      expect(memoizedGetFullNames(inputData)).toEqual(["123 456", "abc def"]);
    });

    it("should not execute the memoized function if the arguments have not changed", () => {
      memoizedGetFullNames(inputData);
      memoizedGetFullNames(inputData);
      memoizedGetFullNames(inputData);
      memoizedGetFullNames(inputData);
      memoizedGetFullNames(inputData);

      expect(getFullNames).toHaveBeenCalledTimes(1);
    });
  });
});
