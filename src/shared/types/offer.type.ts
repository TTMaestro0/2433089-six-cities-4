import { AccommodationType } from './accommodation-type.enum.js';
import { City } from './city.enum.js';
import { Convenience } from './convenience.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: AccommodationType;
  roomCount: number;
  guestCount: number;
  rentPrice: number;
  conveniences: Convenience[];
  author: User;
  commentCount: number;
  coordinates: string;
}
