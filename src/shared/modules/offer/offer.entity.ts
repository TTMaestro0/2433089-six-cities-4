import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { AccommodationType } from '../../types/accommodation-type.enum.js';
import { City } from '../../types/city.enum.js';
import { Convenience } from '../../types/convenience.enum.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base { }
@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    minlength: [10, 'Min length for title is 10'],
    maxlength: [100, 'Min length for title is 100']
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
    minlength: [20, 'Min length for description is 20'],
    maxlength: [1024, 'Min length for description is 1024']
  })
  public description!: string;

  @prop({ required: true })
  public createdDate!: Date;

  @prop({
    required: true,
    type: () => String,
    enum: City
  })
  public city!: City;

  @prop({ required: true })
  public previewImage!: string;

  @prop({
    required: true,
    default: [],
    type: () => String
  })
  public offerImages!: string[];

  @prop({
    required: true,
    default: false
  })
  public isPremium!: boolean;

  @prop({
    required: true,
    default: false
  })
  public isFavorite!: boolean;

  @prop({
    required: true,
    min: 1, max: 5
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: AccommodationType
  })
  public type!: AccommodationType;

  @prop({
    required: true,
    min: 1, max: 8
  })
  public roomCount!: number;

  @prop({
    required: true,
    min: 1, max: 10
  })
  public guestCount!: number;

  @prop({
    required: true,
    min: 100, max: 100000
  })
  public price!: number;

  @prop({
    required: true,
    default: [],
    type: () => String,
    enum: Convenience
  })
  public conveniences!: Convenience[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public authorId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentCount!: number;

  @prop({ required: true })
  public coordinates!: string;
}

export const OfferModel = getModelForClass(OfferEntity);
