import {
  City,
  ConvenienceType,
  HousingType,
  Offer,
} from '../../types/index.js';

export class OfferTsvParser {
  constructor() {}

  parse(rawString: string): Offer {
    const trimString = rawString.trim();

    if (!trimString) {
      throw new Error('rawString should not be empty');
    }

    const splitString = trimString.split('\t');
    const [
      id,
      name,
      description,
      createdAt,
      city,
      previewUrl,
      images,
      isPremium,
      isFavourite,
      rating,
      housingType,
      rooms,
      guests,
      cost,
      conveniences,
      author,
      latitude,
      longitude,
    ] = splitString;

    return {
      id,
      name,
      description,
      createdAt: new Date(createdAt),
      city: city as City,
      previewUrl,
      images: images.split(';'),
      isPremium: Boolean(isPremium),
      isFavourite: Boolean(isFavourite),
      rating: Number(rating),
      housingType: housingType as HousingType,
      rooms: Number(rooms),
      guests: Number(guests),
      cost: Number(cost),
      conveniences: conveniences
        .split(';')
        .map((convenience) => convenience as ConvenienceType),
      author: author,
      latitude: Number(latitude),
      longitude: Number(longitude),
      commentsNumber: 0,
    };
  }

  toString(offer: Offer): string {
    return [
      offer.id,
      offer.name,
      offer.description,
      offer.createdAt,
      offer.city,
      offer.previewUrl,
      offer.images.join(';'),
      offer.isPremium,
      offer.isFavourite,
      offer.rating,
      offer.housingType,
      offer.rooms,
      offer.guests,
      offer.cost,
      offer.conveniences.join(';'),
      offer.author,
      offer.latitude,
      offer.longitude,
    ].join('\t');
  }
}
