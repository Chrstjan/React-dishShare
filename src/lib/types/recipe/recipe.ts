import type { CategoryInterface } from "../category/category";
import type { CuisineInterface } from "../cuisine/cuisine";
import type { DifficultyInterface } from "../difficulty/difficulty";
import type { ImageRelInterface } from "../image/image";
import type { TagsInterface } from "../tag/tag";

export interface RecipeInterface {
  calories: number;
  carbs: number;
  category: CategoryInterface;
  cook_time: number;
  cuisine: CuisineInterface;
  description: string;
  difficulty: DifficultyInterface;
  id: number;
  images: ImageRelInterface[];
  name: string;
  prep_time: number;
  protein: number;
  rating: number;
  servings: number;
  slug: string;
  tags: TagsInterface[] | TagsInterface;
}
