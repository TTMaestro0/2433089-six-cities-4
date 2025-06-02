export enum UserType {
  Basic,
  Pro,
}

export type User = {
  id: string,
  name: string;
  email: string;
  password?: string;
  type: UserType;
  avatar?: string;
}
