import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useFetch } from "../hooks/useFetch";
import type { DataInterface } from "../lib/types/data/data";
import type { UserDataInterface } from "../lib/types/auth/user";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { RecipeCard } from "../components/RecipeCard/RecipeCard";

export const FavoritesPage = () => {
  const { user } = useContext(UserContext);
  const {
    data: userData,
    isLoading,
    error,
  } = useFetch<DataInterface<UserDataInterface>>(
    "https://dishshare.up.railway.app/user?limit=1000",
    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  console.log(userData);

  return (
    <>
      <Wrapper
        sectionHeader
        headerText={
          userData && userData?.data?.favorites?.length > 0
            ? "Your favorites:"
            : ""
        }
        headerType="leftHeader"
      >
        {userData &&
        userData?.data?.favorites?.length > 0 &&
        !isLoading &&
        !error ? (
          <p>Favorites</p>
        ) : (
          <h2>No favorites found</h2>
        )}
      </Wrapper>
    </>
  );
};
