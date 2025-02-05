import { useCallback, useRef } from "react";
import { useEvent } from "../useEvent/useEvent";

/**
 * Определяет тип события окна.
 * Если тип события присутствует в `WindowEventMap`, используется соответствующий тип события,
 * иначе возвращается стандартный `Event`.
 *
 * @template Type - Тип события в виде строки.
 */
type GetWindowEvent<Type extends string> = Type extends keyof WindowEventMap
  ? WindowEventMap[Type]
  : Event;

/**
 * Хук для создания callback ref, который привязывает обработчик события к DOM-элементу.
 * При монтировании элемента к нему добавляется слушатель события, а при размонтировании — удаляется.
 *
 * @template Type - Тип события, передаваемого как строка.
 *
 * @param {Type} type - Тип события (например, "click", "keydown"), которое необходимо прослушивать.
 * @param {(event: GetWindowEvent<Type>) => void} cb - Функция-обработчик события.
 *
 * @returns {(element: Element | null) => void} Callback ref, который нужно назначить DOM-элементу.
 *
 * @example
 * // Пример использования хука для обработки кликов:
 * import React from 'react';
 * import { useEventListenerCbRef } from './useEventListenerCbRef';
 *
 * function MyComponent() {
 *   const ref = useEventListenerCbRef("click", (event) => {
 *     console.log("Элемент кликнут!", event);
 *   });
 *
 *   return <div ref={ref}>Нажми на меня</div>;
 * }
 */
export function useEventListenerCbRef<Type extends string>(
  type: Type,
  cb: (event: GetWindowEvent<Type>) => void
): void;

export function useEventListenerCbRef(
  type: string,
  cb: (event: Event) => void
) {
  const eventCb = useEvent(cb);
  const cleanupRef = useRef(null);

  // Callback ref, который будет привязан к DOM-элементу
  const cbRef = useCallback(
    (element: HTMLElement | null) => {
      if (element) {
        element.addEventListener(type, eventCb);
        cleanupRef.current = () => {
          element.removeEventListener(type, eventCb);
        };
      } else {
        cleanupRef.current?.();
        cleanupRef.current = null;
      }
    },
    [type]
  );

  return cbRef;
}
