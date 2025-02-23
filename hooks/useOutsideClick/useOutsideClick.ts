import { useEffect, RefObject } from "react";
import { useEvent } from "../useEvent/useEvent";

/**
 * Хук, который отслеживает клики вне указанного элемента.
 *
 * @template T - тип HTML-элемента, для которого задан реф.
 * @param {React.RefObject<T>} elementRef - Реф на HTML-элемент, для которого осуществляется отслеживание кликов вне его области.
 * @param {VoidFunction} callback - Функция, которая будет вызвана, если пользователь кликнет вне указанного элемента.
 * (можно еще типизировать как <Fn extends (...args: any[]) => any>. См. useDebounce. UseEvent возвращает с аргументами current(...args))
 * @param {boolean} [attached=true] - Флаг, определяющий, нужно ли прикреплять слушатель событий. Если false, слушатель не добавляется.
 *
 */
export function useOutsideClick<T extends HTMLElement>(
  elementRef: RefObject<T>,
  callback: VoidFunction,
  attached: boolean = true
): void {
  const eventCb = useEvent(callback);

  useEffect(() => {
    if (!attached) return;

    /**
     * Обработчик клика по документу. Если клик произошёл вне указанного элемента,
     * вызывается callback.
     *
     * @param {MouseEvent} event - Событие клика.
     */
    const handleClick = (event: MouseEvent) => {
      // Если ref не задан или элемент не найден, выходим
      if (!elementRef.current) return;

      // Если клик произошёл вне элемента, вызываем callback
      if (!elementRef.current.contains(event.target as Node)) {
        eventCb();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [elementRef, eventCb, attached]);
}
