import { useRef, useEffect } from "react";

/**
 * usePrevious — позволяет при рендере компонента получить предыдущее значение пропса, либо стейта.
 *
 * @param value - значение, которое нужно отслеживать
 * @returns useRef с предыдущем значением
 */
export function usePrevious<T>(value: T) {
  const prevValue = useRef<T | null>(null);

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return prevValue;
}
