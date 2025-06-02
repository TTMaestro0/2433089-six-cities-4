import dayjs from 'dayjs';
import {
  generateRandomBoolean,
  generateRandomValue,
  getRandomEnumValue,
  getRandomEnumValues,
  getRandomItem,
} from '../../helpers/index.js';
import {
  City,
  ConvenienceType,
  HousingType,
  MockServerData,
} from '../../types/index.js';
import { OfferTsvParser } from './index.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { Types } from 'mongoose';

const MIN_DAY_OFFSET = 0;
const MAX_DAY_OFFSET = 14;

const MIN_OFFER_ID = 0;
const MAX_OFFER_ID = 99999;

const MIN_RATING = 1.0;
const MAX_RATING = 5.0;

const MIN_ROOMS = 1;
const MAX_ROOMS = 6;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_COST = 1_000;
const MAX_COST = 500_000;

const MIN_LATITUDE = 0;
const MAX_LATITUDE = 90;

const MIN_LONGITUDE = 0;
const MAX_LONGITUDE = 180;

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  generate(): string {
    const offerId = generateRandomValue(MIN_OFFER_ID, MAX_OFFER_ID);
    const author = getRandomItem(this.mockData.authors);

    const offer = {
      id: String(Types.ObjectId.generate()),
      name: getRandomItem(this.mockData.names),
      description: getRandomItem(this.mockData.descriptions),
      createdAt: dayjs()
        .subtract(generateRandomValue(MIN_DAY_OFFSET, MAX_DAY_OFFSET))
        .toDate(),
      city: getRandomEnumValue(City),
      previewUrl: `https://six-cities.ru/images/${offerId}/0`,
      images: [
        `https://six-cities.ru/images/${offerId}/1`,
        `https://six-cities.ru/images/${offerId}/2`,
        `https://six-cities.ru/images/${offerId}/3`,
        `https://six-cities.ru/images/${offerId}/4`,
        `https://six-cities.ru/images/${offerId}/5`,
        `https://six-cities.ru/images/${offerId}/6`,
      ],
      isPremium: generateRandomBoolean(),
      isFavourite: generateRandomBoolean(),
      rating: generateRandomValue(MIN_RATING, MAX_RATING, 1),
      housingType: getRandomEnumValue(HousingType),
      rooms: generateRandomValue(MIN_ROOMS, MAX_ROOMS),
      guests: generateRandomValue(MIN_GUESTS, MAX_GUESTS),
      cost: generateRandomValue(MIN_COST, MAX_COST, 2),
      conveniences: getRandomEnumValues(ConvenienceType),
      author: author,
      latitude: generateRandomValue(MIN_LATITUDE, MAX_LATITUDE, 6),
      longitude: generateRandomValue(MIN_LONGITUDE, MAX_LONGITUDE, 6),
      commentsNumber: 0,
    };
    const parser = new OfferTsvParser();

    return parser.toString(offer);
  }
}
