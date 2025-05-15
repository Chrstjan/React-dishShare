export interface ImageInterface {
  description: string;
  filename: string;
  is_main: boolean;
}

export interface ImageRelInterface {
  recipe_id: number;
  image: ImageInterface;
}
