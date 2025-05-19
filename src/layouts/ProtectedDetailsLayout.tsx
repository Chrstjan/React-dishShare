import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Outlet, useNavigate } from "react-router";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";

export const ProtectedDetailsLayout = () => {
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

  return (
    <>
      <Outlet />
      <Footer>
        <Navbar />
      </Footer>
    </>
  );
};
