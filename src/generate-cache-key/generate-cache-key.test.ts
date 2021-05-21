import { generateCacheKey } from "./generate-cache-key.function";

describe("generateCacheKey", () => {
  it("should return a special string when there are no arguments in function", () => {
    expect(generateCacheKey()).toEqual("[no_arguments]");
  });

  it("should return proper key for single function argument", () => {
    expect(
      generateCacheKey(() => {
        return 5;
      })
    ).toEqual("[function(){return5;}]");
    expect(generateCacheKey(1)).toEqual("[1]");
    expect(generateCacheKey([])).toEqual("[[]]");
    expect(generateCacheKey({})).toEqual("[{}]");
    expect(generateCacheKey(NaN)).toEqual("[NaN]");
    expect(generateCacheKey(null)).toEqual("[null]");
    expect(generateCacheKey("test")).toEqual("[test]");
  });

  it("should return proper key for multiple function arguments", () => {
    expect(
      generateCacheKey(
        [1, { x: 5, y: 10 }, 4],
        () => {
          return 50;
        },
        null,
        undefined,
        NaN,
        [1, [2, [3, [4, [5, [6], [7, 8]]]]]],
        { x: { y: { z: { deep: "clone" } } } }
      )
    ).toEqual(
      '[[1,{"x":5,"y":10},4]_function(){return50;}_null_undefined_NaN_[1,[2,[3,[4,[5,[6],[7,8]]]]]]_{"x":{"y":{"z":{"deep":"clone"}}}}]'
    );
  });
});
