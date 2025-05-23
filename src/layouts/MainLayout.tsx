import { useState } from "react";
import { Header } from "../components/Header/Header";
import { Burgermenu } from "../components/Burgermenu/Burgermenu";
import { Searchbar } from "../components/Searchbar/Searchbar";
import { Outlet } from "react-router";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";
import { HeaderGreetings } from "../components/HeaderGreetings/HeaderGreetings";

export const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <>
      <HeaderGreetings />
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
