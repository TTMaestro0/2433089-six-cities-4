export const CreateOfferMessages = {
  title: {
    minLength: 'Min title length must be 10',
    maxLength: 'Max title length must be 100',
  },
  description: {
    minLength: 'Min length must be 20',
    maxLength: 'Max description length must be 1024',
  },
  createdDate: {
    invalidFormat: 'CreatedDate must be a valid ISO date',
  },
  city: {
    invalidFormat: 'City must be a valid a string',
  },
  previewImage: {
    invalidFormat: 'Preview image must be a valid a string',
  },
  offerImages: {
    invalidFormat: 'Offer images must be an array',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  isFavorite: {
    invalidFormat: 'isFavorite must be a boolean',
  },
  rating: {
    invalidFormat: 'Rating must be a number',
    minValue: 'Min rating is 1',
    maxValue: 'Min rating is 5',
  },
  type: {
    invalidFormat: 'Type must be a valid a string',
  },
  roomCount: {
    invalidFormat: 'Room count must be an integer',
    minValue: 'Min room count is 1',
    maxValue: 'Min room count is 8',
  },
  guestCount: {
    invalidFormat: 'Guest count must be an integer',
    minValue: 'Min guest count is 1',
    maxValue: 'Min guest count is 10',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Min price is 100',
    maxValue: 'Max price is 100000',
  },
  conveniences: {
    invalidFormat: 'Conveniences must be an array',
  },
  userId: {
    invalidId: 'UserId field must be a valid id',
  },
  coordinates: {
    invalidFormat: 'Coordinates must be a valid a string',
  },
} as const;
