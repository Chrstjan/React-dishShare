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
