import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { LoginUserDto } from './dto/login-user.dto.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findFavoriteOffers(userId: string): Promise<DocumentType<OfferEntity>[]>;
  verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null>;
}
