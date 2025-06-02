import { ApiCity, ApiComment, ApiConvenienceType, ApiHousingType, ApiOffer, ApiUserType, CreateOfferDto, PutOfferDto } from "./api-types";
import { Comment, NewOffer, Offer } from "./types";

export function toClientComment(comment: ApiComment): Comment {
    return {
        id: comment.id,
        comment: comment.text,
        date: comment.createdAt.toDateString(),
        rating: comment.rating,
        user: {
            name: comment.author.name,
            avatarUrl: comment.author.avatar ?? "",
            isPro: comment.author.type == ApiUserType.Pro,
            email: comment.author.email
        }
    }
}

export function toClientOffer(offer: ApiOffer): Offer {
    return {
        id: offer.id,
        price: offer.cost,
        rating: offer.rating,
        title: offer.name,
        isPremium: offer.isPremium,
        isFavorite: offer.isFavourite,
        city: {
            name: offer.city.toString(),
            location: {
                latitude: offer.latitude,
                longitude: offer.longitude
            }
        },
        location: {
            latitude: offer.latitude,
            longitude: offer.longitude
        },
        previewImage: offer.previewUrl,
        type: offer.housingType as 'apartment' | 'room' | 'house' | 'hotel',
        bedrooms: offer.roomsNumber,
        description: offer.description,
        goods: offer.conveniences.map(c => c.toString()),
        host: {
            name: offer.author.name,
            avatarUrl: offer.author.avatar ?? "",
            isPro: offer.author.type == ApiUserType.Pro,
            email: offer.author.email
        },
        images: offer.imagesUrls,
        maxAdults: offer.guestsNumber
    };
}

export function toApiCreateOfferDto(dto: NewOffer): CreateOfferDto {
    console.log(dto.type, dto.type as keyof typeof ApiHousingType, ApiHousingType[dto.type as keyof typeof ApiHousingType]);
    return {
        name: dto.title,
            description: dto.description,
            city: dto.city.name as ApiCity,
            previewUrl: dto.previewImage,
            imagesUrls: [],
            isPremium: dto.isPremium,
            housingType: dto.type as ApiHousingType,
            roomsNumber: dto.bedrooms,
            guestsNumber: dto.maxAdults,
            cost: dto.price,
            conveniences: dto.goods.map(g => g as ApiConvenienceType),
            latitude: dto.location.latitude,
            longitude: dto.location.longitude
    }   
}

export function toApiPutOfferDto(dto: Offer): PutOfferDto {
    console.log(dto.type, dto.type as keyof typeof ApiHousingType, ApiHousingType[dto.type as keyof typeof ApiHousingType]);
    return {
        name: dto.title,
            description: dto.description,
            city: dto.city.name as ApiCity,
            previewUrl: dto.previewImage,
            imagesUrls: [],
            isPremium: dto.isPremium,
            housingType: dto.type as ApiHousingType,
            roomsNumber: dto.bedrooms,
            guestsNumber: dto.maxAdults,
            cost: dto.price,
            conveniences: dto.goods.map(g => g as ApiConvenienceType),
            latitude: dto.location.latitude,
            longitude: dto.location.longitude
    }   
}