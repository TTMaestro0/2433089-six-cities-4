import { City, ConvenienceType, HousingType } from '../../../types/index.js';

export class PutOfferDto {
  public name: string;
  public description: string;
  public city: City;
  public previewUrl: string;
  public imagesUrls: string[];
  public isPremium: boolean;
  public housingType: HousingType;
  public roomsNumber: number;
  public guestsNumber: number;
  public cost: number;
  public conveniences: ConvenienceType[];
  public latitude: number;
  public longitude: number;
}
