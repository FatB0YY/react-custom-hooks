import { useRef, useLayoutEffect } from "react";

/**
 * useLatest - позволяет хранить и получать актуальное значение переменной.
 *
 * @param value - значение, которое нужно отслеживать
 * @returns useRef с актуальным значением
 */
export function useLatest<Value>(value: Value) {
  const valueRef = useRef(value);

  useLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}

// https://frontarm.com/daishi-kato/use-ref-in-concurrent-mode/
