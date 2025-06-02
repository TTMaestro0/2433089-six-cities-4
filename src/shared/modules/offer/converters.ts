import { DocumentType } from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {Offer} from '../../types/index.js';
import {OfferShort} from '../../types/offer-short.type.js';
import {UserEntity} from '../user/index.js';
import { toFullModel as toFullUserModel } from '../user/converters.js';

export function toFullModel(dbModel: DocumentType<OfferEntity>, userId: string, author: DocumentType<UserEntity>, host: string): Offer {
  return {
    id: dbModel._id.toString(),
    name: dbModel.name,
    description: dbModel.description,
    createdAt: dbModel.createdAt!,
    city: dbModel.city,
    previewUrl: dbModel.previewUrl,
    images: dbModel.images,
    isPremium: dbModel.isPremium,
    isFavourite: dbModel.favouriteUsers.map((u) => u.toString()).includes(userId),
    rating: dbModel.rating,
    housingType: dbModel.housingType,
    rooms: dbModel.rooms,
    guests: dbModel.guests,
    cost: dbModel.cost,
    conveniences: dbModel.conveniences,
    author: toFullUserModel(author, host),
    latitude: dbModel.latitude,
    longitude: dbModel.longitude,
    commentsNumber: dbModel.commentsNumber
  };
}

export function toShortModel(dbModel: DocumentType<OfferEntity>, userId: string): OfferShort {
  return {
    id: dbModel._id.toString(),
    name: dbModel.name,
    createdAt: dbModel.createdAt!,
    city: dbModel.city,
    previewUrl: dbModel.previewUrl,
    isPremium: dbModel.isPremium,
    isFavourite: dbModel.favouriteUsers.map((u) => u.toString()).includes(userId),
    rating: dbModel.rating,
    housingType: dbModel.housingType,
    cost: dbModel.cost,
    commentsNumber: dbModel.commentsNumber
  };
}
