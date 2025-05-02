import dayjs from 'dayjs';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { City } from '../../types/city.enum.js';
import { AccommodationType } from '../../types/accommodation-type.enum.js';
import { Convenience } from '../../types/convenience.enum.js';

const MIN_RATING = 0;
const MAX_RATING = 5;

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const MIN_ROOMS = 1;
const MAX_ROOMS = 5;

const MIN_GUESTS = 1;
const MAX_GUESTS = 5;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(Object.values(City));
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const offerImages = getRandomItems<string>(this.mockData.offerImages);
    const isPremium = getRandomItem<boolean>([true, false]);
    const isFavorite = getRandomItem<boolean>([true, false]);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 2);
    const type = getRandomItem<string>(Object.values(AccommodationType));
    const roomCount = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guestCount = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const conveniences = getRandomItems<string>(Object.values(Convenience));

    const author = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);

    const commentCount = generateRandomValue(0, 1000);
    const coordinates = '';

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const [firstName, lastName] = author.split(' ');

    return [
      title, description, createdDate, city,
      previewImage, offerImages, isPremium, isFavorite,
      rating, type, roomCount, guestCount, price, conveniences,
      firstName, lastName, email, avatar, commentCount, coordinates
    ].join('\t');
  }
}
