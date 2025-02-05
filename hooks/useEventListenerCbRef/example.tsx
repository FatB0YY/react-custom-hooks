import React, { useState } from "react";
import { useEventListenerCbRef } from "./useEventListenerCbRef";

export function App() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  const cbRef = useEventListenerCbRef("click", () => {
    console.log("clicked");
  });

  return (
    <div>
      <button onClick={() => setShow((prev) => !prev)}>Toggle</button>

      {show && <div ref={cbRef}>Element</div>}

      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
    </div>
  );
}
