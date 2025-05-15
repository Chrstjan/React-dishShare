import { createContext, useEffect, useState } from "react";
import type { UserInterface } from "../lib/types/auth/user";

interface UserContextInterface {
  user: UserInterface | null;
  loginUser: (userData: UserInterface) => void;
  logoutUser: () => void;
}

export const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  const loginUser = (userData: UserInterface) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    if (!user) {
      return;
    }
    setUser(null);
    sessionStorage.removeItem("user");
  };

  useEffect(() => {
    if (user && user?.access_token) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
    if (!user) {
      const sessionUser = sessionStorage.getItem("user");
      if (sessionUser) {
        setUser(JSON.parse(sessionUser));
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
