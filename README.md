# memoize-function

![Lint Check](https://github.com/playerony/memoize-function/workflows/Lint/badge.svg)
![Test Check](https://github.com/playerony/memoize-function/workflows/Test/badge.svg)
![Production Build](https://github.com/playerony/memoize-function/workflows/Build/badge.svg)
![Typecheck Check](https://github.com/playerony/memoize-function/workflows/Typecheck/badge.svg)

> In computing, memoization is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.
> — Wikipedia

A memoization library that caches all results and supports _N_ arguments with any type.

## Installation

```shell
npm install memoize-function --save
```

## Usage

```js
const memoizeFunction = require("memoize-function");

const factorial = memoizeFunction((value) => {
  if (value <= 1) {
    return 1;
  }

  return value * factorial(value - 1);
});

factorial(50);
factorial(20); // Value from cache
```

### Custom storage

It is possible to pass a custom storage to be used.

```js
const memoized = memoizeFunction(fn, {
  storage: {
    store: {},
    clear() {
      this.store = {};
    },
    remove(key) {
      delete this.store[key];
    },
    set(key, value) {
      this.store[key] = value;
    },
    get(key) {
      return this.store[key] || null;
    },
  },
});
```

```js
class Storage {
  store;

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  remove(key) {
    delete this.store[key];
  }

  get(key) {
    return this.store[key] || null;
  }

  set(key, value) {
    this.store[key] = value;
  }
}

const memoized = memoizeFunction(fn, {
  storage: new Storage(),
});
```

The custom cache can be a class or an object implementing the following methods:

- `get`
- `set`
- `clear`
- `remove`

### Custom cache key generator

To use a custom cache key generator:

```js
const generateCacheKey = (...args) =>
  "my_custom_key_for_each_function_argument";

const memoized = memoizeFunction(fn, {
  generateCacheKey,
});
```
