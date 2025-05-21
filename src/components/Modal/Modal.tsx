import type { Dispatch, ReactNode, SetStateAction } from "react";
import s from "./Modal.module.scss";

type ModalType = {
  children: ReactNode;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const Modal = ({ children, setIsModalOpen }: ModalType) => {
  return (
    <>
      <div
        onClick={() => setIsModalOpen((prev) => !prev)}
        className={s.overlayStyling}
      ></div>
      <div className={s.modalStyling}>{children}</div>
    </>
  );
};
