const memoize = (callback) => {
  const cache = {}
  const functionName = callback.name
  
  return (...args) => {
    const parsedArguments = args.join(',')
    const cacheKey = `${functionName}_${parsedArguments}`
    const cachedValue = cache[cacheKey]

    if (!cachedValue) {
      const result = callback(...args)
      cache[cacheKey] = result
      
      return result
    }
    
    return cachedValue
  }
}
