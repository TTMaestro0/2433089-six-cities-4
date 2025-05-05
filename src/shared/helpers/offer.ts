import { AccommodationType } from '../types/accommodation-type.enum.js';
import { City } from '../types/city.enum.js';
import { Convenience } from '../types/convenience.enum.js';
import { Offer } from '../types/offer.type.js';
import { User } from '../types/user.type.js';

export function createOffer(offerData: string): Offer {
  const [
    title, description, createdDate, city,
    previewImage, offerImages, isPremium, isFavorite,
    rating, type, roomCount, guestCount, price, conveniences,
    name, email, avatar, commentCount, coordinates
  ] = offerData.replace('\n', '').split('\t');

  const user: User = {
    email,
    name,
    avatar
  };

  return {
    title,
    description,
    createdDate: new Date(createdDate),
    city: city as City,
    previewImage,
    offerImages: offerImages.split(';'),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: Number(rating),
    type: type as AccommodationType,
    roomCount: Number.parseInt(roomCount, 10),
    guestCount: Number.parseInt(guestCount, 10),
    price: Number.parseInt(price, 10),
    conveniences: conveniences.split(';')
      .map((convenience) => convenience as Convenience),
    user: user,
    commentCount: Number.parseInt(commentCount, 10),
    coordinates
  };
}
