import { AccommodationType } from './accommodation-type.enum.js';
import { City } from './city.enum.js';
import { Convenience } from './convenience.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  createdDate: Date;
  city: City;
  previewImage: string;
  offerImages: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: AccommodationType;
  roomCount: number;
  guestCount: number;
  price: number;
  conveniences: Convenience[];
  user: User;
  commentCount: number;
  coordinates: string;
}
