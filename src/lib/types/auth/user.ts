import type { ImageInterface } from "../image/image";
import type { RecipeInterface } from "../recipe/recipe";
import type { CommentInterface } from "./comment";
import type { FavoriteInterface } from "./favorite";

interface UserInfoInterface {
  id: number;
  email: string;
  username: string;
}

export interface UserInterface {
  access_token?: string;
  user: UserInfoInterface;
}

export interface RecipeCreatorInterface {
  avatar: string;
  username: string;
}

export interface UserDataInterface {
  avatar: string;
  comments: CommentInterface[];
  email: string;
  favorites: FavoriteInterface[];
  id: number;
  images: ImageInterface[];
  recipes: RecipeInterface[];
  username: string;
}
