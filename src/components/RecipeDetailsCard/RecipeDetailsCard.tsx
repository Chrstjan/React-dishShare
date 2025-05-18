import { useContext, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../../context/UserContext";
import type { RecipeDetailsInterface } from "../../lib/types/recipe/recipe";
import type {
  IngredientInterface,
  InstructionInterface,
} from "../../lib/types/recipe/details";
import { Button } from "../Button/Button";
import s from "./RecipeDetailsCard.module.scss";
import { RecipeCardTag } from "../RecipeCardTag/RecipeCardTag";

interface RecipeDetailsCardInterface {
  data: RecipeDetailsInterface;
  type?: string;
}

export const RecipeDetailsCard = ({
  data,
  type,
}: RecipeDetailsCardInterface) => {
  const { user } = useContext(UserContext);
  const [showIngredients, setShowIngredients] = useState<boolean>(true);

  const handleFavoriteRecipe = () => {
    console.log("Recipe favorite");
  };

  return (
    <figure className={`${s.detailsStyling} ${type ? s[type] : ""}`}>
      <header>
        <img src={data?.images[0]?.image?.filename} alt={data?.name} />
        <div className={s.optionsConainer}>
          <Link to="/">
            <Button text="<" type="recipeIcon" />
          </Link>
          {user && user?.access_token && user?.access_token?.length > 0 ? (
            <Button
              text="Favorite"
              action={() => handleFavoriteRecipe()}
              type="recipeIcon"
            />
          ) : null}
        </div>
      </header>
      <figcaption className={s.detailsContainer}>
        <header>
          <h2>{data?.name}</h2>
          <span className={s.iconContainer}>
            <p>{data?.prep_time} Minute</p>
            <p>Prep</p>
          </span>
        </header>
        <section className={s.tagsContainer}>
          <div className={s.tagContainer}>
            {data && data?.category ? (
              <RecipeCardTag data={data?.category} />
            ) : null}
          </div>
          <div className={s.tagContainer}>
            {data && data?.cuisine ? (
              <RecipeCardTag data={data?.cuisine} />
            ) : null}
          </div>
          <div className={s.tagContainer}>
            {data && Array.isArray(data?.tags)
              ? data?.tags?.map((item) => (
                  <RecipeCardTag key={item?.tag?.slug} data={item?.tag} />
                ))
              : null}
          </div>
        </section>
        <div className={s.creatorContainer}>
          <h4>Creator:</h4>
          <span>
            <h5>{data?.creator?.username}</h5>
            <img
              src={
                data?.creator?.avatar?.length > 2
                  ? data?.creator?.avatar
                  : "/images/blank-profile-picture.png"
              }
              alt={data?.creator?.username}
            />
          </span>
        </div>
        <div className={s.infoContainer}>
          <span className={s.iconContainer}>
            <p>{data?.cook_time} Minute</p>
            <p>Cooking</p>
          </span>
          <span className={s.iconContainer}>
            <p>{data?.rating}</p>
            <p>Rating</p>
          </span>
          <span className={s.iconContainer}>
            <p>{data?.difficulty?.name} level</p>
            <p>Recipes</p>
          </span>
        </div>
        <p className={s.descriptionStyling}>{data?.description}</p>
        <div className={s.listStyling}>
          <header className={s.listHeader}>
            <Button
              text="Ingredients"
              action={() => setShowIngredients(true)}
            />
            <Button
              text="Instructions"
              action={() => setShowIngredients(false)}
            />
          </header>
          {showIngredients ? (
            <ul className={s.ingredStyling}>
              {data && data?.ingredients?.length > 0 ? (
                data?.ingredients?.map((item: IngredientInterface) => {
                  return (
                    <li>
                      <span className={s.ingredientContainer}>
                        <p>{item?.name}</p>
                        <p>{item?.amount}</p>
                      </span>
                    </li>
                  );
                })
              ) : (
                <p>No ingredients found</p>
              )}
            </ul>
          ) : (
            <ul className={s.instrucStyling}>
              {data && data?.instructions.length > 0 ? (
                data?.instructions?.map((item: InstructionInterface, index) => {
                  return (
                    <li>
                      <p>
                        Step {index + 1}: {item?.step}
                      </p>
                    </li>
                  );
                })
              ) : (
                <p>No instructions found</p>
              )}
            </ul>
          )}
        </div>
        <div className={s.includesContainer}>
          <span className={s.barStyling}>
            <p>Protein: {data?.protein} g</p>
            <p>Calories: {data?.calories} kcal</p>
          </span>
          <span className={s.barStyling}>
            <p>Carbs: {data?.carbs} g</p>
            <p>Fat: {data?.fat} g</p>
          </span>
        </div>
      </figcaption>
    </figure>
  );
};
