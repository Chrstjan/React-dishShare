import { Outlet } from "react-router";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";

export const MainLayout = () => {
  return (
    <>
      <Outlet />
      <Footer>
        <Navbar />
      </Footer>
    </>
  );
};
