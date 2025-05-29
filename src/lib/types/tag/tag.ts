import type { RecipeInterface } from "../recipe/recipe";

export interface TagInterface {
  name: string;
  slug: string;
}

export interface TagsInterface {
  id: number;
  recipe_id: number;
  tag: TagInterface;
  recipe?: RecipeInterface | RecipeInterface[];
}

export interface TagDetailsInterface {
  id: number;
  image?: string;
  name: string;
  slug: string;
  recipes?: RecipeInterface[];
  tags?: TagsInterface;
}
