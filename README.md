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
const { memoizeFunction } = require("memoize-function");

const factorial = memoizeFunction((value) => {
  if (value <= 1) {
    return 1;
  }

  return value * factorial(value - 1);
});

factorial(50);
factorial(20); // Value from cache
```
