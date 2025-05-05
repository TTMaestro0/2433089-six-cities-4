import { AccommodationType } from '../../../types/accommodation-type.enum.js';
import { City } from '../../../types/city.enum.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public createdDate: Date;
  public city: City;
  public previewImage: string;
  public offerImages: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: AccommodationType;
  public roomCount: number;
  public guestCount: number;
  public price: number;
  public conveniences: string[];
  public userId: string;
  public commentCount: number;
  public coordinates: string;
}
