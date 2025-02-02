import React, { useState } from "react";
import { useWhyDidUpdate } from "./useWhyDidUpdate";

export function App() {
  const [count, setCount] = useState(0);

  const inc = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <h1>Hello React.</h1>
      <button onClick={inc}>inc</button>
      <Child count={count} />
    </div>
  );
}

const Child = (props) => {
  useWhyDidUpdate(props);

  const { count } = props;

  return <div>{count}</div>;
};
