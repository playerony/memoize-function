import { generateCacheKey } from "./generate-cache-key.function";

describe("generateCacheKey", () => {
  it("should return an empty string when no parameter was passed", () => {
    expect(generateCacheKey()).toEqual("");
  });

  it("should return proper key for single parameter", () => {
    expect(generateCacheKey(1)).toEqual("_1_");
    expect(generateCacheKey([])).toEqual("_[]_");
    expect(generateCacheKey({})).toEqual("_{}_");
    expect(generateCacheKey(NaN)).toEqual("_NaN_");
    expect(generateCacheKey(null)).toEqual("_null_");
    expect(generateCacheKey("test")).toEqual("_test_");
    expect(generateCacheKey(() => {})).toEqual("_function(){}_");
  });

  it("should return proper key for multiple parameters", () => {
    expect(generateCacheKey(1, 2, 3, 4, 5, 6, 7)).toEqual("_1_2_3_4_5_6_7_");
    expect(generateCacheKey([1, 2, 4], true, null)).toEqual(
      "_[1,2,4]_true_null_"
    );
  });
});
