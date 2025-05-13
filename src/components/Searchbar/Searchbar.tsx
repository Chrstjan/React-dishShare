import { Form } from "react-router";
import { IoIosSearch as Search } from "react-icons/io";
import s from "./Searchbar.module.scss";

export const Searchbar = () => {
  return (
    <>
      <div className={s.overlayStyling}></div>
      <div className={s.formContainer}>
        <Form className={s.searchbarStyling} action="/search">
          <input type="text" placeholder="Search for recipes..." name="p" />
          <span>
            <button type="submit">
              <Search />
            </button>
          </span>
        </Form>
      </div>
    </>
  );
};
