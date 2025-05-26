import type { TagInterface } from "../../lib/types/tag/tag";
import type { CategoryInterface } from "../../lib/types/category/category";
import type { CuisineInterface } from "../../lib/types/cuisine/cuisine";
import s from "./RecipeCardTag.module.scss";

interface RecipeCardTagInterface {
  data: TagInterface | CategoryInterface | CuisineInterface;
}

export const RecipeCardTag = ({ data }: RecipeCardTagInterface) => {
  return (
    <span className={s.recipeBarStyling}>
      <p>{data?.name}</p>
    </span>
  );
};
