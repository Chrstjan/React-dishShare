import type { CategoryInterface } from "../../lib/types/category/category";
import type { CuisineInterface } from "../../lib/types/cuisine/cuisine";
import type { DifficultyInterface } from "../../lib/types/difficulty/difficulty";
import type { TagsInterface } from "../../lib/types/tag/tag";
import s from "./RecipeCardTag.module.scss";

interface RecipeCardTagInterface {
  data:
    | TagsInterface
    | TagsInterface[]
    | CategoryInterface
    | CuisineInterface
    | DifficultyInterface;
}

export const RecipeCardTag = ({ data }: RecipeCardTagInterface) => {
  return (
    <div className={s.containerStyling}>
      {Array.isArray(data) && data?.length > 0 ? (
        data?.map((item: TagsInterface) => {
          return (
            <span className={s.recipeBarStyling}>
              <p>{item?.tag?.name}</p>
            </span>
          );
        })
      ) : (
        <span className={s.recipeBarStyling}>
          <p>{data?.name}</p>
        </span>
      )}
    </div>
  );
};
