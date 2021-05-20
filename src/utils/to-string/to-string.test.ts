import { toString } from "./to-string.function";

describe("toString", () => {
  it("should parse all primitive values to string", () => {
    expect(toString(1)).toEqual("1");
    expect(toString(NaN)).toEqual("NaN");
    expect(toString(null)).toEqual("null");
    expect(toString("string")).toEqual("string");
    expect(toString(Infinity)).toEqual("Infinity");
    expect(toString(undefined)).toEqual("undefined");
    expect(toString(Symbol.iterator)).toEqual("Symbol(Symbol.iterator)");
  });

  it("should parse passed object to json string", () => {
    const testObject = {
      value1: "value1",
      value2: 2,
      value3: ["1", "2"],
    };

    const expectedResult = '{"value1":"value1","value2":2,"value3":["1","2"]}';

    expect(toString(testObject)).toEqual(expectedResult);
  });

  it("should parse passed array to json string", () => {
    const testArray = [1, "test", { 1: "a" }];
    const expectedResult = '[1,"test",{"1":"a"}]';

    expect(toString(testArray)).toEqual(expectedResult);
  });

  it("should parse passed class depends if it's an instance or function", () => {
    class TestClass {
      private value: number = 5;

      public getValue(): number {
        return this.value;
      }
    }

    const expectedResult = '{"value":5}';

    expect(toString(new TestClass())).toEqual(expectedResult);
    expect(toString(TestClass)).toEqual("functionTestClass(){this.value=5;}");
  });

  it("should parse passed function to string", () => {
    const testFunction = () => {
      return "test";
    };

    const expectedResult = 'function(){return"test";}';

    expect(toString(testFunction)).toEqual(expectedResult);
  });
});
