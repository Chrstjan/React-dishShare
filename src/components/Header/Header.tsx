import s from "./Header.module.scss";

export const Header = ({ children }: { children: React.ReactNode }) => {
  return <header className={s.headerStyling}>{children}</header>;
};
