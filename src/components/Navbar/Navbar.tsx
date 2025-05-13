import s from "./Navbar.module.scss";

export const Navbar = () => {
  return (
    <>
      <nav>
        <ul className={`${s.navStyling}`}></ul>
      </nav>
    </>
  );
};
