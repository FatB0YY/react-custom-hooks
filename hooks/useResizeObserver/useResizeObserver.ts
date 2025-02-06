import { useCallback, useRef } from "react";

/**
 * Хук для отслеживания изменений размеров DOM-элемента с использованием ResizeObserver.
 *
 * @param {ResizeObserverCallback} onResize - Функция обратного вызова, вызываемая при изменении размеров наблюдаемого элемента.
 * @returns {(element: HTMLElement | null) => void} callback-ref, который привязывает/отключает наблюдатель к DOM-элементу.
 */
export function useResizeObserver(onResize: ResizeObserverCallback) {
  const roRef = useRef<ResizeObserver | null>(null);

  /**
   * Создает и подключает ResizeObserver к указанному элементу.
   *
   * @param {HTMLElement} element - DOM-элемент, за которым будет вестись наблюдение.
   */
  const attachResizeObserver = useCallback(
    (element: HTMLElement) => {
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(element);
      roRef.current = resizeObserver;
    },
    [onResize]
  );

  /**
   * Отключает (отсоединяет) текущий ResizeObserver, если он существует.
   */
  const detachResizeObserver = useCallback(() => {
    roRef.current?.disconnect();
  }, []);

  /**
   * Ref callback, который привязывает или отключает ResizeObserver в зависимости от наличия элемента.
   *
   * @param {HTMLElement | null} element - DOM-элемент, полученный от React через ref.
   */
  const refCb = useCallback(
    (element: HTMLElement | null) => {
      if (element) {
        attachResizeObserver(element);
      } else {
        detachResizeObserver();
      }
    },
    [attachResizeObserver, detachResizeObserver]
  );

  return refCb;
}
