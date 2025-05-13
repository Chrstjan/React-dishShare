import s from "./Footer.module.scss";

export const Footer = ({ children }: { children: React.ReactNode }) => {
  return <footer className={s.footerStyling}>{children}</footer>;
};
