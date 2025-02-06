import { useCallback, MutableRefObject } from "react";

type RefItem<T> =
  | ((element: T | null) => void) // Функциональный ref
  | MutableRefObject<T | null> // Объектный ref (созданный, например, через useRef)
  | null
  | undefined;

/**
 * Хук, объединяющий несколько ref'ов в один callback ref.
 * При вызове возвращённого callback'а со значением `element`, оно будет присвоено каждому переданному ref.
 *
 * @template T - Тип элемента, на который ссылается ref.
 * @param {...( ((element: T | null) => void) | MutableRefObject<T | null> | null | undefined } refs - Один или несколько ref'ов, которые необходимо обновлять.
 * @returns {(element: T | null) => void} Callback ref, который обновляет все переданные ref'ы.
 *
 * @example
 * const localRef = useRef<HTMLDivElement>(null);
 * const combinedRef = useCombinedRef(localRef, forwardedRef);
 * return <div ref={combinedRef}>Пример компонента</div>;
 */
export function useCombinedRef<T>(...refs: RefItem<T>[]) {
  const refCb = useCallback((element: T | null) => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }
      if (typeof ref === "function") {
        ref(element);
      } else {
        ref.current = element;
      }
    });
  }, refs);

  return refCb;
}
