import { useRef, useEffect } from "react";

/**
 * Хук, определяющий, был ли компонент монтирован.
 * Возвращает `ref`, указывающий, монтирован ли компонент в данный момент.
 *
 * @returns {React.MutableRefObject<boolean>} ref-объект, содержащий `true`, если компонент монтирован, и `false` после размонтирования.
 *
 */
export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
