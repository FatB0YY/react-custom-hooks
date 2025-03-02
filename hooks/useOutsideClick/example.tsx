import React, { useRef, useState, FC } from "react";
import { useOutsideClick } from "./useOutsideClick";

interface TooltipProps {
  opened: boolean;
  triggerRef?: React.RefObject<HTMLElement>;
  onClose: () => void;
}

const Tooltip: FC<TooltipProps> = ({ opened, onClose, triggerRef }) => {
  const tooltipRef = useRef(null);

  useOutsideClick({
    elementRef: tooltipRef,
    onOutsideClick: onClose,
    attached: opened,
    triggerRef: triggerRef,
  });

  if (!opened) return null;

  return (
    <div ref={tooltipRef} className="tooltip">
      <button>Some Text</button>
    </div>
  );
};

export default function App() {
  const [opened, setOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClose = () => {
    setOpened(false);
  };

  return (
    <>
      <div className="tooltip-container">
        <Tooltip opened={opened} onClose={onClose} triggerRef={buttonRef} />
        <button
          ref={buttonRef}
          className="tooltip-trigger"
          onClick={() => {
            setOpened((value) => !value);
          }}
        >
          Click to open tooltip
        </button>
      </div>
    </>
  );
}
