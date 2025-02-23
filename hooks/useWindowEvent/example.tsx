import React, { useState } from "react";
import { useWindowEvent } from "./useWindowEvent";

export function UseWindowEventExample() {
  const [{ x, y, diffX, diffY }, setMousePosition] = useState({
    x: 0,
    y: 0,
    diffX: 0,
    diffY: 0,
  });

  useWindowEvent("mousemove", (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
      diffX: event.clientX - x,
      diffY: event.clientY - y,
    });
  });

  return (
    <div>
      <h4>mouse position</h4>
      X: {x}
      Y: {y}
      <h4>Diff from prev position</h4>
      X: {diffX}
      Y: {diffY}
    </div>
  );
}
