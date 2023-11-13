import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

/*
## Understanding the useEffect:

### Behavior across time:

0ms => user type - 'h'
  useEffect - new timer
150ms => user type - 'he'
  clear useEffect - clear timeout
  useEffect - new timer
300ms => user type - 'hel'
  clear useEffect - clear timeout
  useEffect - new timer
400ms => user type - 'hello'
  clear useEffect - clear timeout
  useEffect - new timer
900ms => setDebouncedValue('hello') => debounceValue
*/
