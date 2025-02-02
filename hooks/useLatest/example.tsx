import React, { memo, useState, useCallback } from "react";
import { useLatest } from "./useLatest";

const Button = memo(function Button({ text, onClick }) {
  console.log("render button");
  return <button onClick={onClick}>{text}</button>;
});

export function App3() {
  const [count, setCount] = useState(0);
  const countRef = useLatest<number>(count);

  const logCounts = useCallback(() => {
    console.log({ count: countRef.current });
  }, []);

  return (
    <>
      <Button onClick={logCounts} text={"log count"} />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  );
}
