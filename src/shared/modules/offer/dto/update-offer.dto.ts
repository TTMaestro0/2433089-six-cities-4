import { AccommodationType } from '../../../types/accommodation-type.enum.js';
import { City } from '../../../types/city.enum.js';
import { IsArray, IsOptional, IsBoolean, IsDateString, IsInt, IsMongoId, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateOfferMessages } from './create-offer.messages.js';


export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: CreateOfferMessages.title.minLength })
  @MaxLength(100, { message: CreateOfferMessages.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: CreateOfferMessages.description.minLength })
  @MaxLength(1024, { message: CreateOfferMessages.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: CreateOfferMessages.createdDate.invalidFormat })
  public createdDate?: Date;

  @IsOptional()
  @IsString({ message: CreateOfferMessages.city.invalidFormat })
  public city?: City;

  @IsOptional()
  @IsString({ message: CreateOfferMessages.previewImage.invalidFormat })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: CreateOfferMessages.offerImages.invalidFormat })
  public offerImages?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateOfferMessages.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({ message: CreateOfferMessages.isFavorite.invalidFormat })
  public isFavorite?: boolean;

  @IsOptional()
  @IsNumber({}, { message: CreateOfferMessages.rating.invalidFormat })
  @Min(1, { message: CreateOfferMessages.rating.minValue })
  @Max(5, { message: CreateOfferMessages.rating.maxValue })
  public rating?: number;

  @IsOptional()
  @IsString({ message: CreateOfferMessages.type.invalidFormat })
  public type?: AccommodationType;

  @IsOptional()
  @IsInt({ message: CreateOfferMessages.roomCount.invalidFormat })
  @Min(1, { message: CreateOfferMessages.roomCount.minValue })
  @Max(8, { message: CreateOfferMessages.roomCount.maxValue })
  public roomCount?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferMessages.guestCount.invalidFormat })
  @Min(1, { message: CreateOfferMessages.guestCount.minValue })
  @Max(10, { message: CreateOfferMessages.guestCount.maxValue })
  public guestCount?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferMessages.price.invalidFormat })
  @Min(100, { message: CreateOfferMessages.price.minValue })
  @Max(100000, { message: CreateOfferMessages.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: CreateOfferMessages.conveniences.invalidFormat })
  public conveniences?: string[];

  @IsOptional()
  @IsMongoId({ message: CreateOfferMessages.userId.invalidId })
  public userId?: string;

  @IsOptional()
  public commentCount?: number;

  @IsOptional()
  @IsString({ message: CreateOfferMessages.coordinates.invalidFormat })
  public coordinates?: string;
}
