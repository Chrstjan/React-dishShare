import type { RecipeInterface } from "../recipe/recipe";
import type { TagsInterface } from "../tag/tag";

export interface CuisineInterface {
  name: string;
  slug: string;
}

export interface CuisineDetailsInterface {
  id: number;
  image?: string;
  name: string;
  slug: string;
  recipes: RecipeInterface[];
  tags?: TagsInterface;
}
