import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import s from "./HeaderGreetings.module.scss";

export const HeaderGreetings = () => {
  const { user } = useContext(UserContext);
  return (
    <div className={s.greetingsStyling}>
      <h1>DishShare</h1>
      <h4>Dish it out — create, share, explore.</h4>
      {user && user?.user ? (
        <span className={s.userContainer}>
          <h2>Welcome, {user?.user?.username}</h2>
          <p>Ready to create or share?</p>
        </span>
      ) : null}
    </div>
  );
};
