import { useState } from "react";
import { Header } from "../components/Header/Header";
import { Burgermenu } from "../components/Burgermenu/Burgermenu";
import { Searchbar } from "../components/Searchbar/Searchbar";
import { Outlet } from "react-router";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";

export const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <>
      <h1>DishShare</h1>
      <h4>Dish it out — create, share, explore.</h4>
      <Header>
        <Burgermenu setIsMenuOpen={setIsMenuOpen} />
        {isMenuOpen ? <Searchbar /> : null}
      </Header>
      <Outlet />
      <Footer>
        <Navbar />
      </Footer>
    </>
  );
};
