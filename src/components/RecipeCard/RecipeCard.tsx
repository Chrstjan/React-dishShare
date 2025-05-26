import type { RecipeInterface } from "../../lib/types/recipe/recipe";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router";
import s from "./RecipeCard.module.scss";
import { deleteRecipe } from "../../lib/actions/recipe/deleteRecipe";
interface RecipeCardInterface {
  data: RecipeInterface[] | RecipeInterface;
  type?: string;
  canEdit?: boolean;
}

export const RecipeCard = ({ data, type, canEdit }: RecipeCardInterface) => {
  const { user } = useContext(UserContext);
  const [recipes, setRecipes] = useState<RecipeInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && Array.isArray(data) && data?.length > 0) {
      setRecipes(data);
    }
  }, [data]);

  const handleCardClick = async (slug: string) => {
    navigate(`/recipe/${slug}`);
  };

  const handleDeleteRecipe = async (id: number) => {
    if (id) {
      const res = await deleteRecipe(id, user);

      const data = await res.json();

      if (data?.message == "Success") {
        setRecipes((prev) => [...prev.filter((item) => item.id !== id)]);
      }
    }
  };

  return (
    <>
      {recipes && recipes?.length > 0
        ? recipes?.map((item: RecipeInterface) => {
            return (
              <>
                <figure
                  className={`${s.cardStyling} ${type ? s[type] : ""}`}
                  key={item?.id || item?.slug}
                  onClick={() => handleCardClick(item?.slug)}
                >
                  <header>
                    {item?.images?.length > 0}{" "}
                    {
                      <img
                        src={item?.images[0]?.image?.filename}
                        alt={item?.name}
                      />
                    }
                  </header>
                  <figcaption>
                    <header>
                      <h3>{item?.name}</h3>
                      <span className={s.timeStyling}>
                        {item?.prep_time ? (
                          <p>Prep: {item?.prep_time} min</p>
                        ) : null}
                        {item?.cook_time ? (
                          <p>Prep: {item?.cook_time} min</p>
                        ) : null}
                      </span>
                    </header>
                    <h4>{item?.description?.slice(0, 30)}...</h4>
                    <div className={s.infoContainer}>
                      {item?.servings ? (
                        <p>Servings: {item?.servings}</p>
                      ) : null}
                      {item?.protein ? <p>Protein: {item?.protein} g</p> : null}
                      {item?.carbs ? <p>Carbs: {item?.carbs} g</p> : null}
                      {item?.calories ? (
                        <p>Calories: {item?.calories} kcal</p>
                      ) : null}
                    </div>
                  </figcaption>
                </figure>
                {canEdit ? (
                  <span className={s.editContainer}>
                    <p onClick={() => handleDeleteRecipe(item?.id)}>
                      Delete Recipe
                    </p>
                    <Link to={`/edit/${item?.slug}`}>
                      <p>Edit Recipe</p>
                    </Link>
                  </span>
                ) : null}
              </>
            );
          })
        : null}
    </>
  );
};
