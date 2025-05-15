import type { RecipeInterface } from "../../lib/types/recipe/recipe";
import s from "./RecipeCard.module.scss";

interface RecipeCardInterface {
  data: RecipeInterface[];
  type?: string;
}

export const RecipeCard = ({ data, type }: RecipeCardInterface) => {
  return (
    <>
      {data && data?.length > 0
        ? data?.map((item: RecipeInterface) => {
            return (
              <figure
                className={`${s.cardStyling} ${type ? s[type] : ""}`}
                key={item?.id}
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
                      <p>Prep: {item?.prep_time} min</p>
                      <p>Cook: {item?.cook_time} min</p>
                    </span>
                  </header>
                  <h4>{item?.description?.slice(0, 30)}...</h4>
                  <div className={s.infoContainer}>
                    <p>Servings: {item?.servings}</p>
                    <p>Protein: {item?.protein} g</p>
                    <p>Carbs: {item?.carbs} g</p>
                    <p>Calories: {item?.calories} kcal</p>
                  </div>
                </figcaption>
              </figure>
            );
          })
        : null}
    </>
  );
};
