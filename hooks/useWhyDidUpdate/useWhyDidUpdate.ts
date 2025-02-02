import { usePrevious } from "../usePrevious/usePrevious";

/**
 * useWhyDidUpdate - хук для отслеживания изменений в пропсах компонента и вывода их в консоль
 *
 * @param props - объект пропсов, который нужно отслеживать
 */
export function useWhyDidUpdate<T extends Record<string, any>>(props: T): void {
  const prevPropsRef = usePrevious(props);
  const prevProps = prevPropsRef.current;

  if (!prevProps) {
    console.log("Initial render");
    return;
  }

  const prevKeys = Object.keys(prevProps);
  const keys = Object.keys(props);

  const allKeys = [...new Set(keys.concat(prevKeys))];
  let hasChanged = false;

  allKeys.forEach((key) => {
    if (prevProps[key] !== props[key]) {
      console.group("============");
      console.log(`Prop '${key}' changed`);
      console.log(`Prev value:`, prevProps[key]);
      console.log(`Current value:`, props[key]);
      console.log("============");
      console.groupEnd();

      hasChanged = true;
    }
  });

  if (!hasChanged) {
    console.log("State changed");
  }
}
