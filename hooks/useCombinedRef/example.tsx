import React, {
  forwardRef,
  ChangeEventHandler,
  useRef,
  useEffect,
  ForwardedRef,
} from "react";
import { useCombinedRef } from "./useCombinedRef";

interface InputProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef(function Input(
  props: InputProps,
  // первый реф, который нужно объединить (prop-ref)
  ref: ForwardedRef<HTMLInputElement>
) {
  // второй реф, который нужно объединить
  const inputRef = useRef<HTMLInputElement>(null);

  // объединенные рефы в cb-ref
  const combinedInputRef = useCombinedRef(ref, inputRef);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    console.log(inputRef.current.getBoundingClientRect());
  }, []);

  return <input {...props} ref={combinedInputRef} />;
});

export function UsageCombine() {
  // первый реф, который нужно объединить
  const inputRef = useRef<HTMLInputElement | null>(null);

  const focus = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={focus}>Focus</button>
    </div>
  );
}
