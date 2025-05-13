import type { Dispatch, SetStateAction } from "react";
import s from "./Burgermenu.module.scss";

export const Burgermenu = ({
  setIsMenuOpen,
}: {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      onClick={() => setIsMenuOpen((prev) => !prev)}
      className={`${s.burgerStyling}`}
    >
      <span className={`${s.barStyling}`}></span>
      <span className={`${s.barStyling}`}></span>
      <span className={`${s.barStyling}`}></span>
    </div>
  );
};
