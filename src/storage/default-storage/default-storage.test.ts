import { Storage } from "../shared";
import { DefaultStorage } from "./default-storage.class";

describe("DefaultStorage", () => {
  let storage: Storage<number>;

  beforeEach(() => {
    storage = new DefaultStorage<number>();
  });

  it("should contain setItem and getItem methods", () => {
    storage.setItem("key5", 5);
    storage.setItem("key7", 7);

    expect(storage.getItem("key5")).toEqual(5);
    expect(storage.getItem("key7")).toEqual(7);
    expect(storage.getItem("random_key")).toBeNull();
  });

  it("should contain length method", () => {
    storage.setItem("key1", 1);
    storage.setItem("key2", 2);
    storage.setItem("key3", 3);

    expect(storage.length()).toEqual(3);
  });

  it("should contain removeItem method", () => {
    storage.setItem("key1", 1);
    storage.setItem("key2", 2);
    storage.setItem("key3", 3);
    expect(storage.length()).toEqual(3);

    storage.removeItem("key2");
    expect(storage.length()).toEqual(2);
  });

  it("should contain key method", () => {
    storage.setItem("key1", 1);
    storage.setItem("key2", 2);
    storage.setItem("key3", 3);

    expect(storage.key(10)).toBeNull();
    expect(storage.key(1)).toEqual("key2");
    expect(storage.key(2)).toEqual("key3");
  });

  it("should contain clear method", () => {
    storage.setItem("key1", 1);
    storage.setItem("key2", 2);
    storage.setItem("key3", 3);

    storage.clear();

    expect(storage.length()).toEqual(0);
  });
});
