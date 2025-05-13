import { NavLink } from "react-router";
import s from "./Navbar.module.scss";
import { SlHome as Home } from "react-icons/sl";
import { RiCompassDiscoverLine as Discover } from "react-icons/ri";
import { SlPlus as Create } from "react-icons/sl";
import { LuUser as User } from "react-icons/lu";

export const Navbar = () => {
  return (
    <>
      <nav>
        <ul className={`${s.navStyling}`}>
          <li>
            <NavLink to="/" end>
              <span className={s.iconStyling}>
                <Home />
                <p>Home</p>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/discover">
              <span className={s.iconStyling}>
                <Discover />
                <p>Discover</p>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/create">
              <span className={s.iconStyling}>
                <Create />
                <p>Create</p>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/account">
              <span className={s.iconStyling}>
                <User />
                <p>User</p>
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
