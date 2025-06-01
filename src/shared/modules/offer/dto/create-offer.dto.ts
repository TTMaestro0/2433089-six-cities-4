import { AccommodationType } from '../../../types/accommodation-type.enum.js';
import { City } from '../../../types/city.enum.js';
import { IsArray, IsBoolean, IsDateString, IsInt, IsMongoId, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateOfferMessages } from './create-offer.messages.js';


export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferMessages.title.minLength })
  @MaxLength(100, { message: CreateOfferMessages.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferMessages.description.minLength })
  @MaxLength(1024, { message: CreateOfferMessages.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferMessages.createdDate.invalidFormat })
  public createdDate: Date;

  @IsString({ message: CreateOfferMessages.city.invalidFormat })
  public city: City;

  @IsString({ message: CreateOfferMessages.previewImage.invalidFormat })
  public previewImage: string;

  @IsArray({ message: CreateOfferMessages.offerImages.invalidFormat })
  public offerImages: string[];

  @IsBoolean({ message: CreateOfferMessages.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsBoolean({ message: CreateOfferMessages.isFavorite.invalidFormat })
  public isFavorite: boolean;

  @IsNumber({}, { message: CreateOfferMessages.rating.invalidFormat })
  @Min(1, { message: CreateOfferMessages.rating.minValue })
  @Max(5, { message: CreateOfferMessages.rating.maxValue })
  public rating: number;

  @IsString({ message: CreateOfferMessages.type.invalidFormat })
  public type: AccommodationType;

  @IsInt({ message: CreateOfferMessages.roomCount.invalidFormat })
  @Min(1, { message: CreateOfferMessages.roomCount.minValue })
  @Max(8, { message: CreateOfferMessages.roomCount.maxValue })
  public roomCount: number;

  @IsInt({ message: CreateOfferMessages.guestCount.invalidFormat })
  @Min(1, { message: CreateOfferMessages.guestCount.minValue })
  @Max(10, { message: CreateOfferMessages.guestCount.maxValue })
  public guestCount: number;

  @IsInt({ message: CreateOfferMessages.price.invalidFormat })
  @Min(100, { message: CreateOfferMessages.price.minValue })
  @Max(100000, { message: CreateOfferMessages.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferMessages.conveniences.invalidFormat })
  public conveniences: string[];

  @IsMongoId({ message: CreateOfferMessages.userId.invalidId })
  public userId: string;

  public commentCount: number;

  @IsString({ message: CreateOfferMessages.coordinates.invalidFormat })
  public coordinates: string;
}
