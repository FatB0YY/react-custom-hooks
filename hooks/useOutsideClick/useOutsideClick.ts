import { useEffect, RefObject } from "react";
import { useEvent } from "../useEvent/useEvent";

type UseOutsideClickProps<T extends HTMLElement> = {
  elementRef: RefObject<T>;
  onOutsideClick:
    | ((event: MouseEvent | TouchEvent | KeyboardEvent) => void)
    | VoidFunction;
  attached?: boolean;
  triggerRef?: RefObject<T>;
};

/**
 * Хук, который отслеживает клики вне указанного элемента.
 *
 * @template T - тип HTML-элемента, для которого задан реф.
 * @param {RefObject<T>} elementRef - Реф на HTML-элемент, для которого осуществляется отслеживание кликов вне его области.
 * @param {((event: MouseEvent | TouchEvent | KeyboardEvent) => void) | VoidFunction} onOutsideClick - Функция, которая будет вызвана, если пользователь кликнет или нажмёт Enter вне указанного элемента.
 * @param {boolean | undefined} [attached=true] - Флаг, определяющий, нужно ли прикреплять слушатель событий. Если false, слушатель не добавляется.
 * @param {RefObject<T> | undefined} triggerRef - Реф на триггер, который также будет игнорироваться.
 *
 */
export function useOutsideClick<T extends HTMLElement>({
  elementRef,
  onOutsideClick,
  attached = true,
  triggerRef,
}: UseOutsideClickProps<T>): void {
  const eventHandleOutsideClick = useEvent(onOutsideClick);

  useEffect(() => {
    if (!attached) return;

    // Функция для получения списка элементов, которые нужно игнорировать.
    const getIgnoreElements = (): HTMLElement[] => {
      const elements: HTMLElement[] = [];
      if (elementRef && elementRef.current) elements.push(elementRef.current);
      if (triggerRef && triggerRef.current) elements.push(triggerRef.current);
      return elements;
    };

    const handleClick = (event: MouseEvent | TouchEvent) => {
      // Если ref не задан или элемент не найден, выходим
      if (!elementRef || !elementRef.current) return;
      // Проверка необходима для того, чтобы гарантировать,
      // что event.target действительно является узлом DOM (объектом, наследующим от Node).
      if (!(event.target instanceof Node)) return;

      const ignoreElements = getIgnoreElements();

      if (
        !ignoreElements.some((element) =>
          element.contains(event.target as Node)
        )
      ) {
        eventHandleOutsideClick(event);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;

      const ignoreElements = getIgnoreElements();
      const activeElement = document.activeElement;

      // Если фокусированный элемент не входит ни в один из игнорируемых элементов – вызываем обработчик.
      if (
        activeElement &&
        !ignoreElements.some((element) => element.contains(activeElement))
      ) {
        eventHandleOutsideClick(event);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [elementRef, triggerRef, eventHandleOutsideClick, attached]);
}
