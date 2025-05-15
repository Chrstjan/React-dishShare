export interface TagInterface {
  name: string;
  slug: string;
}

export interface TagsInterface {
  recipe_id: number;
  tag: TagInterface;
}
