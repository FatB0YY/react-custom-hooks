import React, { useRef, useState } from "react";
import { useOutsideClick } from "./useOutsideClick";

function Tooltip({ opened, onClose }) {
  const tooltipRef = useRef(null);

  useOutsideClick(tooltipRef, onClose, opened);

  if (!opened) return null;

  return (
    <div ref={tooltipRef} className="tooltip">
      <div>Some Text</div>
    </div>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);

  const onClose = () => {
    setOpened(false);
  };

  return (
    <>
      <div className="tooltip-container">
        <Tooltip opened={opened} onClose={onClose} />
        <button
          className="tooltip-trigger"
          onClick={(event) => {
            event.stopPropagation();
            setOpened((v) => !v);
          }}
        >
          Click to open tooltip
        </button>
      </div>
    </>
  );
}
