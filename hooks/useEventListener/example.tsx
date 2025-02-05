import React, { useState, useRef } from "react";
import { useEventListener } from "./useEventListener";

export function App() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  const ref = useRef(null);

  useEventListener(
    ref,
    "click",
    () => {
      console.log("clicked");
    },
    show
  );

  return (
    <div>
      <button onClick={() => setShow((prev) => !prev)}>Toggle</button>

      {show && <div ref={ref}>Element</div>}

      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
    </div>
  );
}
