export interface ImageInterface {
  id: number;
  user_id: number;
  description: string;
  filename: string;
  is_main: boolean;
}

export interface ChosenImageInterface {
  id: number;
  filename: string;
}

export interface ImageRelInterface {
  recipe_id: number;
  image: ImageInterface;
}
