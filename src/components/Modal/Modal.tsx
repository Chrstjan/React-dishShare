import type { ReactNode } from "react";
import s from "./Modal.module.scss";

export const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className={s.overlayStyling}></div>
      <div className={s.modalStyling}>{children}</div>
    </>
  );
};
