import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import type {
  UserDataInterface,
  UserInterface,
} from "../../lib/types/auth/user";
import type { DataInterface } from "../../lib/types/data/data";
import s from "./FeaturedUserRecipe.module.scss";
import type { RecipeInterface } from "../../lib/types/recipe/recipe";
import { Link } from "react-router";

export const FeaturedUserRecipe = ({ user }: { user: UserInterface }) => {
  const { data, isLoading, error } = useFetch<DataInterface<UserDataInterface>>(
    "https://dishshare.up.railway.app/user?limit=1000",
    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );
  const [recipe, setRecipe] = useState<RecipeInterface>();

  useEffect(() => {
    if (data && data?.data && !isLoading && !error) {
      setRecipe(data?.data?.recipes?.slice(-1)[0]);
    }
  }, [data]);

  return (
    <>
      {recipe && recipe?.name?.length > 0 ? (
        <Link className={s.featuredCard} to={`/recipe/${recipe?.slug}`}>
          <figure className={s.featuredCardStyling}>
            <header>
              <img src={recipe?.images[0]?.image?.filename} />
            </header>
            <figcaption className={s.infoContainer}>
              <h3>Menu for {recipe?.category?.slug}</h3>
              <h2>{recipe?.name}</h2>
              <p>{recipe?.description?.slice(0, 10)}...</p>
            </figcaption>
          </figure>
        </Link>
      ) : null}
    </>
  );
};
