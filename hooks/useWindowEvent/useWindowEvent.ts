import { useEffect } from "react";
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
 * Хук для подписки на события окна.
 * Позволяет подписаться на указанное событие браузерного окна и выполнить переданный колбэк.
 *
 * @template Type - Тип события в виде строки.
 * @param {Type} type - Название события (например, 'resize', 'scroll', 'keydown' и т. д.).
 * @param {(event: GetWindowEvent<Type>) => void} cb - Колбэк, который будет вызван при наступлении события.
 *
 * @example
 * useWindowEvent("resize", (event) => {
 *   console.log("Изменение размера окна", event);
 * });
 */
export function useWindowEvent<Type extends string>(
  type: Type,
  cb: (event: GetWindowEvent<Type>) => void
): void;

export function useWindowEvent(type: string, cb: (event: Event) => void) {
  const eventCb = useEvent(cb);

  useEffect(() => {
    console.log("==============");

    window.addEventListener(type, eventCb);

    return () => window.removeEventListener(type, eventCb);
  }, [type, eventCb]);
}
