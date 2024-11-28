import { useRef, useState } from "react";
import "./style.scss";
import { useClickAway } from "../../hooks/useClickAway";
import { css } from "../../toolbox/css";

type PopOverProps = Partial<{
  open: boolean;
  persist?: boolean;
  onClickAway: Function;
  children: React.ReactNode;
  position: Partial<{
    top: number|string;
    left: number|string;
    right: number|string;
    bottom: number|string;
  }>
}>

export function PopOver({ open, persist, children, onClickAway, position }: PopOverProps) {
  const $ref = useRef(null);

  useClickAway($ref, () => {
    onClickAway && onClickAway();
  });

  if (!open && !persist) {
    return null;
  }

  return (
    <div
      ref={$ref}
      data-open={open}
      className="pop-over"
      style={css({
        top: position?.top || 'unset',
        left: position?.left || 'unset',
        right: position?.right || 'unset',
        bottom: position?.bottom || 'unset',
      })}
    >
      {children}
    </div>
  )
}