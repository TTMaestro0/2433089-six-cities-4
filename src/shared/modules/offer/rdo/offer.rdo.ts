import { Expose } from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { User } from '../../../types/user.type.js';
import { AccommodationType } from '../../../types/accommodation-type.enum.js';
import { Convenience } from '../../../types/convenience.enum.js';

export class OfferRdo {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public createdDate!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public previewImage!: string;

  @Expose()
  public offerImages!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: AccommodationType;

  @Expose()
  public roomCount!: number;

  @Expose()
  public guestCount!: number;

  @Expose()
  public price!: number;

  @Expose()
  public conveniences!: Convenience[];

  @Expose()
  public user!: User;

  @Expose()
  public coordinates!: string;
}
