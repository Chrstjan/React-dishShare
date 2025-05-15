import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import { Burgermenu } from "../components/Burgermenu/Burgermenu";
import { Searchbar } from "../components/Searchbar/Searchbar";
import { Outlet, useNavigate } from "react-router";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";
import { UserContext } from "../context/UserContext";

export const ProtectedLayout = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.access_token || user.access_token.length === 0) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user?.access_token || user.access_token.length === 0) {
    return null;
  }

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <>
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
