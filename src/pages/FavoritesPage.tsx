import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useFetch } from "../hooks/useFetch";
import { deleteFavorite } from "../lib/actions/auth/favorite/deleteFavorite";
import type { DataInterface } from "../lib/types/data/data";
import type { UserDataInterface } from "../lib/types/auth/user";
import type { FavoriteInterface } from "../lib/types/auth/favorite";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { RecipeCard } from "../components/RecipeCard/RecipeCard";

export const FavoritesPage = () => {
  const { user } = useContext(UserContext);
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useFetch<DataInterface<UserDataInterface>>(
    "https://dishshare.up.railway.app/user?limit=1000",
    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );
  const [favorites, setFavorites] = useState<FavoriteInterface[]>([]);

  useEffect(() => {
    if (userData && userData?.data) {
      setFavorites(userData?.data?.favorites);
    }
  }, [userData]);

  const handleRemoveFavorite = async (id: number) => {
    const res = await deleteFavorite(id, user);

    if (res.message || res.data == "Recipe removed from favorites") {
      setFavorites((prev) => [...prev].filter((item) => item?.id !== id));
      refetch;
    }
  };

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
        userData?.data &&
        favorites &&
        favorites?.length > 0 &&
        !isLoading &&
        !error ? (
          favorites?.map((item: FavoriteInterface) => {
            return (
              <>
                <RecipeCard data={[item?.recipe]} />
                <p onClick={() => handleRemoveFavorite(item?.id)}>
                  Remove favorite
                </p>
              </>
            );
          })
        ) : (
          <h2>No favorites found</h2>
        )}
      </Wrapper>
    </>
  );
};
