import { useEffect, useRef, EffectCallback, DependencyList } from "react";

/**
 * useUpdateEffect - Выполняет эффект только при изменении зависимостей, но не на первом рендере.
 *
 * @param effect - Функция-эффект, которая будет выполняться
 * @param deps - Массив зависимостей, при изменении которых эффект будет срабатывать
 */
export function useUpdateEffect(
  effect: EffectCallback,
  deps?: DependencyList
): void {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return effect();
  }, deps);
}
