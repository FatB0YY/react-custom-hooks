import React, { useState, useEffect } from "react";
import { useUpdateEffect } from "./useUpdateEffect";

function ExampleComponent() {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => {
    console.log(`useUpdateEffect. Count изменился: ${count}`);
  }, [count]);

  useEffect(() => {
    console.log(`useEffect. Count изменился: ${count}`);
  }, [count]);

  return (
    <div>
      <p>Счетчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>Увеличить</button>
    </div>
  );
}

export default ExampleComponent;
