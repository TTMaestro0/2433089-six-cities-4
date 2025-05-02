import { UserType } from './user-type.enum.js';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  password?: string;
  type?: UserType;
}
