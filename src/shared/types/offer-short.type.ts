import {City, HousingType} from './offer.types.js';

export type OfferShort = {
  id: string,
  name: string;
  createdAt: Date;
  city: City;
  previewUrl: string;
  isPremium: boolean;
  isFavourite: boolean;
  rating: number;
  housingType: HousingType;
  cost: number;
  commentsNumber: number;
}
