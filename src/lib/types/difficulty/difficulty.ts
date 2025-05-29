import type { RecipeInterface } from "../recipe/recipe";
import type { TagsInterface } from "../tag/tag";

export interface DifficultyInterface {
  name: string;
  slug: string;
}

export interface DifficultyDetailsInterface {
  id: number;
  image?: string;
  name: string;
  slug: string;
  recipes: RecipeInterface[];
  tags?: TagsInterface;
}
