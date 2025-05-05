import { UserType } from './user-type.enum.js';

export type User = {
  name: string;
  email: string;
  avatar: string;
  type?: UserType;
}
