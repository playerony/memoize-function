import { Storage } from "./default-storage.type";
import { DefaultStorage } from "./default-storage.class";

describe("DefaultStorage", () => {
  let storage: Storage<number>;

  beforeEach(() => {
    storage = new DefaultStorage<number>();
  });

  it("should contain set and get methods", () => {
    storage.set("key5", 5);
    storage.set("key7", 7);

    expect(storage.get("key5")).toEqual(5);
    expect(storage.get("key7")).toEqual(7);
    expect(storage.get("random_key")).toBeNull();
  });

  it("should contain remove method", () => {
    storage.set("key1", 1);
    storage.set("key2", 2);
    storage.set("key3", 3);

    storage.remove("key2");
    expect(storage.get("key2")).toBeNull();
  });

  it("should contain clear method", () => {
    storage.set("key1", 1);
    storage.set("key2", 2);
    storage.set("key3", 3);

    storage.clear();

    expect(storage.get("key1")).toBeNull();
    expect(storage.get("key2")).toBeNull();
    expect(storage.get("key3")).toBeNull();
  });
});
