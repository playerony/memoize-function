import { generateCacheKey } from "./generate-cache-key.function";

describe("generateCacheKey", () => {
  it("should return an empty string when no parameter was passed", () => {
    expect(generateCacheKey()).toEqual("");
  });

  it("should return proper key for single parameter", () => {
    expect(generateCacheKey(1)).toEqual("[1]");
    expect(generateCacheKey([])).toEqual("[[]]");
    expect(generateCacheKey({})).toEqual("[{}]");
    expect(generateCacheKey(NaN)).toEqual("[NaN]");
    expect(generateCacheKey(null)).toEqual("[null]");
    expect(generateCacheKey("test")).toEqual("[test]");
    expect(generateCacheKey(() => {})).toEqual("[function(){}]");
  });

  it("should return proper key for multiple parameters", () => {
    expect(generateCacheKey(1, 2, 3, 4, 5, 6, 7)).toEqual("[1_2_3_4_5_6_7]");
    expect(generateCacheKey([1, 2, 4], true, null)).toEqual(
      "[[1,2,4]_true_null]"
    );
  });
});
