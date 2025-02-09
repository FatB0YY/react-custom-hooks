import { useRef, useLayoutEffect, useCallback } from "react";

/**
 * Возвращает стабильный колбэк, всегда вызывающий последнюю версию переданной функции.
 *
 * Этот хук решает сразу две задачи:
 * 1. Избавляет от проблемы «устаревших замыканий» (stale closure), всегда используя актуальную реализацию функции `fn`.
 * 2. Сохраняет одну и ту же ссылку на колбэк между рендерами (мемоизация ссылки), что позволяет избежать лишних перерисовок у компонентов, которые зависят от этой ссылки.
 *
 * @template T Функция, которая принимает любые аргументы и возвращает любое значение.
 * @param fn Функция, которую нужно «застабилизировать» и при этом всегда использовать её последнюю версию.
 * @returns {(...args: Parameters<T>) => ReturnType<T>} Стабильная ссылка на колбэк, вызывающая актуальную версию `fn`.
 */
export function useEvent<T extends (...args: any[]) => any>(fn: T) {
  const fnRef = useRef(fn);

  useLayoutEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const eventCb = useCallback(
    (...args: Parameters<T>): ReturnType<T> => {
      return fnRef.current(...args);
    },
    [fnRef]
  );

  return eventCb;
}
