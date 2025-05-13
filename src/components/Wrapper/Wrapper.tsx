import type { ReactNode } from "react";
import s from "./Wrapper.module.scss";

interface WrapperInterface {
  children: ReactNode;
  type?: string;
  sectionHeader?: boolean;
  headerText?: string;
  subHeaderText?: string;
}

export const Wrapper = ({
  children,
  type,
  sectionHeader,
  headerText,
  subHeaderText,
}: WrapperInterface) => {
  return (
    <section className={`${s.wrapperStyling} ${type ? s[type] : ""}`}>
      {sectionHeader ? (
        <header className={`${s.headerStyling}`}>
          {headerText ? <h2>{headerText}</h2> : null}
          {subHeaderText ? <p>{subHeaderText}</p> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
};
