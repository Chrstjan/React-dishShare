import { useContext } from "react";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { useFetch } from "../hooks/useFetch";
import type { UserDataInterface } from "../lib/types/auth/user";
import type { DataInterface } from "../lib/types/data/data";
import { UserContext } from "../context/UserContext";
import { RecipeCard } from "../components/RecipeCard/RecipeCard";

export const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const { data, isLoading, error } = useFetch<DataInterface<UserDataInterface>>(
    "https://dishshare.up.railway.app/user?limit=1000",
    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  return (
    <>
      <Wrapper sectionHeader headerText="Your recipes" type="userRecipes">
        {data && data?.data?.recipes.length > 0 && !isLoading && !error ? (
          <RecipeCard data={data?.data?.recipes} canEdit />
        ) : (
          <h3>No recipes found</h3>
        )}
      </Wrapper>
    </>
  );
};
