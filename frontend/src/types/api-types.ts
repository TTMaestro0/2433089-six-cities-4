export enum ApiUserType {
  Basic,
  Pro
}

export type ApiUser = {
  id: string,
  name: string;
  email: string;
  type: ApiUserType;
  avatar?: string;
}

export type ApiComment = {
  id: string,
  text: string;
  createdAt: Date;
  rating: number;
  author: ApiUser;
}

export enum ApiCity {
    Paris = 'Paris',
    Cologne = 'Cologne',
    Brussels = 'Brussels',
    Amsterdam = 'Amsterdam',
    Hamburg = 'Hamburg',
    Dusseldorf = 'Dusseldorf'
  }

export enum ApiHousingType {
    Apartment = 'apartment',
    House = 'house',
    Room = 'room',
    Hotel = 'hotel'
  }

export enum ApiConvenienceType {
    Breakfast = 'Breakfast',
    AirConditioning = 'Air conditioning',
    LaptopFriendlyWorkspace = 'Laptop friendly workspace',
    BabySeat = 'Baby seat',
    Washer = 'Washer',
    Towels = 'Towels',
    Fridge = 'Fridge'
  }
  
export type ApiOffer = {
  id: string,
  name: string;
  description: string;
  createdAt: Date;
  city: ApiCity;
  previewUrl: string;
  imagesUrls: string[];
  isPremium: boolean;
  isFavourite: boolean;
  rating: number;
  housingType: ApiHousingType;
  roomsNumber: number;
  guestsNumber: number;
  cost: number;
  conveniences: ApiConvenienceType[];
  author: ApiUser;
  latitude: number;
  longitude: number;
  commentsNumber: number;
}
  

export type ApiOfferShort = {
  id: string,
  name: string;
  createdAt: Date;
  city: ApiCity;
  previewUrl: string;
  isPremium: boolean;
  isFavourite: boolean;
  rating: number;
  housingType: ApiHousingType;
  cost: number;
  commentsNumber: number;
}

export type CreateOfferDto = {
    name: string;
    description: string;
    city: ApiCity;
    previewUrl: string;
    imagesUrls: string[];
    isPremium: boolean;
    housingType: ApiHousingType;
    roomsNumber: number;
    guestsNumber: number;
    cost: number;
    conveniences: ApiConvenienceType[];
    latitude: number;
    longitude: number;
}

export type CreateUserDto = {
  email: string;
  avatar?: string;
  name: string;
  password: string;
  type: ApiUserType;
}

export type PutOfferDto = {
  name: string;
  description: string;
  city: ApiCity;
  previewUrl: string;
  imagesUrls: string[];
  isPremium: boolean;
  housingType: ApiHousingType;
  roomsNumber: number;
  guestsNumber: number;
  cost: number;
  conveniences: ApiConvenienceType[];
  latitude: number;
  longitude: number;
}
