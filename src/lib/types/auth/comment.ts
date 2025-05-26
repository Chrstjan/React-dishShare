import type { RecipeCreatorInterface } from "./user";

export interface CommentInterface {
  id: number;
  recipe_id: number;
  subject: string;
  content: string;
  createdAt: string;
  user?: RecipeCreatorInterface;
}
