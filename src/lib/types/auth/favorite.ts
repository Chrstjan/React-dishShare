import type { RecipeInterface } from "../recipe/recipe";

export interface FavoriteInterface {
  id: number;
  recipe_id: number;
  recipe: RecipeInterface;
}
