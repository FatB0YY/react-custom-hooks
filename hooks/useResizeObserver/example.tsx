import React, { useState, useCallback } from "react";
import { useResizeObserver } from "./useResizeObserver";

function ExampleComponent() {
  const [bool, setBool] = useState(false);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    console.log("resize", entries);
  }, []);

  const resizeRef = useResizeObserver(handleResize);

  const renderTestText = () => {
    if (bool) {
      return <article ref={resizeRef}>Test Article</article>;
    }

    return <div ref={resizeRef}>Test Div</div>;
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <button onClick={() => setBool((v) => !v)}>Toggle</button>
      {renderTestText()}
    </div>
  );
}

export default ExampleComponent;
