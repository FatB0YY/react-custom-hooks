import { useEffect, RefObject } from "react";
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
 * Хук для добавления слушателя события к DOM-элементу, на который ссылается переданный ref.
 * Обработчик события добавляется, если параметр `active` равен true, и автоматически удаляется при размонтировании
 * или изменении зависимостей.
 *
 * @template T - тип DOM-элемента, наследуемого от EventTarget
 * @template Type - тип события (ключ из WindowEventMap или произвольная строка)
 * @param {RefObject<T>} elementRef - Ссылка на DOM-элемент, на котором нужно установить слушатель события.
 * @param {Type} type - Тип события, которое необходимо прослушивать (например, "click", "keydown").
 * @param {(event: Type extends keyof WindowEventMap ? WindowEventMap[Type] : Event) => void} cb - Функция-обработчик события.
 * @param {boolean} active - Флаг, указывающий, должен ли слушатель быть активным (true – добавить слушатель, false – не добавлять). Например стейт `show`.
 *
 */
export function useEventListener<
  T extends EventTarget,
  Type extends keyof WindowEventMap
>(
  elementRef: RefObject<T>,
  type: Type,
  cb: (event: WindowEventMap[Type]) => void,
  active: boolean
): void;

/**
 * Общая перегрузка для произвольных типов событий.
 */
export function useEventListener<T extends EventTarget, Type extends string>(
  elementRef: RefObject<T>,
  type: Type,
  cb: (event: GetWindowEvent<Type>) => void,
  active: boolean
): void {
  const eventCb = useEvent(cb);

  useEffect(() => {
    if (!active) return;
    const element: HTMLElement | null = elementRef.current;
    if (!element) return;

    element.addEventListener(type, eventCb);
    return () => element.removeEventListener(type, eventCb);
  }, [active, eventCb, elementRef, type]);
}
