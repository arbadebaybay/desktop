const deepEquals: (
  actual: object,
  expected: object,
  opts?: { strict: boolean }
) => boolean = require('deep-equal')

export function structuralEquals<T extends object>(actual: T, expected: T): boolean {
  return deepEquals(actual, expected, { strict: true })
}

/**
 * Performs a shallow equality comparison on the two objects, iterating over
 * their keys (non-recursively) and compares their values.
 * 
 * This method is functionally identical to that of React's shallowCompare
 * function and is intended to be used where we need to test for the same
 * kind of equality comparisons that a PureComponent performs.
 * 
 * Note that for Arrays and primitive types this method will follow the same
 * semantics as Object.is, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
export function shallowEquals(x: any, y: any) {
  if (Object.is(x, y)) {
    return true
  }

  // After this we know that neither side is null or undefined
  if (x === null || y === null || typeof x !== 'object' || typeof y !== 'object') {
    return false
  }

  const xKeys = Object.keys(x)
  const yKeys = Object.keys(y)

  if (xKeys.length !== yKeys.length) {
    return false
  }

  for (let i = 0; i < xKeys.length; i++) {
    const key = xKeys[i]
    if (!Object.prototype.hasOwnProperty.call(y, key) || !Object.is(x[key], y[key])) {
      return false
    }
  }

  return true
}
