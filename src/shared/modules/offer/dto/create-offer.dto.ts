
import { City, ConvenienceType, HousingType } from '../../../types/index.js';

export class CreateOfferDto {
  public name: string;
  public description: string;
  public city: City;
  public previewUrl: string;
  public images: string[];
  public isPremium: boolean;
  public housingType: HousingType;
  public rooms: number;
  public guests: number;
  public cost: number;
  public conveniences: ConvenienceType[];
  public authorId: string;
  public latitude: number;
  public longitude: number;
}
