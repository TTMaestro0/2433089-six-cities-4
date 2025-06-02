import { DocumentType } from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {Offer} from '../../types/index.js';
import {Types} from 'mongoose';
import {OfferShort} from '../../types/offer-short.model.js';

export function toFullModel(dbModel: DocumentType<OfferEntity>, userId: string): Offer {
  return {
    id: String(dbModel._id),
    name: dbModel.name,
    description: dbModel.description,
    createdAt: dbModel.createdAt!,
    city: dbModel.city,
    previewUrl: dbModel.previewUrl,
    images: dbModel.images,
    isPremium: dbModel.isPremium,
    isFavourite: dbModel.favouriteUsers.includes(new Types.ObjectId(userId)),
    rating: dbModel.rating,
    housingType: dbModel.housingType,
    rooms: dbModel.rooms,
    guests: dbModel.guests,
    cost: dbModel.cost,
    conveniences: dbModel.conveniences,
    author: String(dbModel.authorId),
    latitude: dbModel.latitude,
    longitude: dbModel.longitude,
    commentsNumber: dbModel.commentsNumber
  };
}

export function toShortModel(dbModel: DocumentType<OfferEntity>, userId: string): OfferShort {
  return {
    id: String(dbModel._id),
    name: dbModel.name,
    createdAt: dbModel.createdAt!,
    city: dbModel.city,
    previewUrl: dbModel.previewUrl,
    isPremium: dbModel.isPremium,
    isFavourite: dbModel.favouriteUsers.includes(new Types.ObjectId(userId)),
    rating: dbModel.rating,
    housingType: dbModel.housingType,
    cost: dbModel.cost,
    commentsNumber: dbModel.commentsNumber
  };
}
