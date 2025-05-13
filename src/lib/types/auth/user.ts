interface UserInfoInterface {
  id: number;
  email: string;
  username: string;
}

export interface UserInterface {
  access_token?: string;
  user: UserInfoInterface;
}
