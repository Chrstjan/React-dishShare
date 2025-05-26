import type { RecipeCreatorInterface } from "./user";

export interface CommentInterface {
  recipe_id: number;
  subject: string;
  content: string;
  createdAt: string;
  user?: RecipeCreatorInterface;
}
