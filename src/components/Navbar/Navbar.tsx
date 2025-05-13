import { NavLink } from "react-router";
import s from "./Navbar.module.scss";
import { SlHome as Home } from "react-icons/sl";
import { RiCompassDiscoverLine as Discover } from "react-icons/ri";
import { SlPlus as Create } from "react-icons/sl";
import { LuUser as Profile } from "react-icons/lu";
import { GrFavorite as Favorite } from "react-icons/gr";

export const Navbar = () => {
  return (
    <>
      <nav>
        <ul className={`${s.navStyling}`}>
          <div className={s.leftContainer}>
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
          </div>
          <li>
            <NavLink to="/create">
              <span className={s.iconStyling}>
                <Create />
                <p>Create</p>
              </span>
            </NavLink>
          </li>
          <div className={s.rightContainer}>
            <li>
              <NavLink to="/account">
                <span className={s.iconStyling}>
                  <Profile />
                  <p>Profile</p>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites">
                <span className={s.iconStyling}>
                  <Favorite />
                  <p>Favorites</p>
                </span>
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};
