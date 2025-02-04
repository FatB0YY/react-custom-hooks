import { useMemo, useEffect } from "react";
import { useEvent } from "../useEvent/useEvent";

/**
 * Хук, возвращающий функцию с дебаунсингом.
 *
 * Функция, обёрнутая данным хуком, будет вызвана через `ms` миллисекунд после последнего вызова.
 * Если функция вызывается повторно в течение этого интервала, предыдущий вызов отменяется.
 *
 * @template Fn Тип функции, которую необходимо обернуть.
 * @param {Fn} fn Функция, которую нужно обернуть в дебаунс.
 * @param {number} ms Задержка в миллисекундах, после которой будет вызвана функция.
 * @returns {Fn & { cancel: () => void }} Дебаунсированная версия функции `fn`, дополненная методом `cancel` для отмены отложенного вызова.
 */
export function useDebounce<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ms: number
) {
  const memoizedFn = useEvent(fn);

  const debouncedFn = useMemo(
    () =>
      debounce((...args: Parameters<Fn>) => {
        memoizedFn(...args);
      }, ms),
    [memoizedFn, ms]
  );

  useEffect(
    () => () => {
      debouncedFn.cancel();
    },
    [debouncedFn]
  );

  return debouncedFn;
}

/**
 * Функция debounce возвращает обёрнутую версию переданной функции `fn`,
 * которая будет вызвана через `ms` миллисекунд после последнего вызова.
 * При повторных вызовах в течение указанного интервала предыдущий таймаут отменяется.
 *
 * @template T Тип функции, которую необходимо обернуть.
 * @param {T} fn Функция, которая будет вызвана с задержкой.
 * @param {number} ms Задержка в миллисекундах.
 * @returns {T & { cancel: () => void }} Дебаунсированная функция с дополнительным методом `cancel` для отмены запланированного вызова.
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number) {
  let timeoutId: number | null = null;

  /**
   * Обёртка, реализующая логику дебаунсинга.
   *
   * @param {...Parameters<T>} args Аргументы, которые будут переданы в функцию `fn`.
   */
  function debounced(...args: Parameters<T>) {
    if (typeof timeoutId === "number") {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn.apply(null, args);
    }, ms);
  }

  /**
   * Метод для отмены запланированного вызова функции `fn`.
   */
  debounced.cancel = () => {
    if (typeof timeoutId !== "number") {
      return;
    }
    clearTimeout(timeoutId);
  };

  return debounced;
}
