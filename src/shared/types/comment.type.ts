import {User} from './user.types.js';


export type Comment = {
  id: string,
  text: string;
  createdAt: Date;
  rating: number;
  author: User;
}
