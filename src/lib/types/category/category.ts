import type { RecipeInterface } from "../recipe/recipe";
import type { TagsInterface } from "../tag/tag";

export interface CategoryInterface {
  name: string;
  slug: string;
  image?: string;
}

export interface CategoryDetailsInterface {
  id: number;
  image: string;
  name: string;
  slug: string;
  recipes: RecipeInterface[];
  tags?: TagsInterface;
}
