import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { ObjectId, Types } from 'mongoose';
import 'reflect-metadata';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserService } from './user-service.interface.js';
import { UserEntity } from './user.entity.js';
import {createSHA256} from '../../helpers/index.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel)
    private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async checkIdExists(id: Types.ObjectId): Promise<boolean> {
    const result = await this.userModel.findById(id);
    return Boolean(result);
  }

  public async create(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findById(
    id: ObjectId
  ): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id);
  }

  public async findByEmail(
    email: string
  ): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email });
  }

  public async findOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async checkPassword(email: string, password: string, salt: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(email);

    if (!user) {
      return null;
    }

    const currentHash = createSHA256(password, salt);
    const hashFromDb = user.getPassword();

    if (currentHash !== hashFromDb) {
      return null;
    }

    return user;
  }

  public async updateAvatar(id: ObjectId, avatarPath: string): Promise<void> {
    await this.userModel.updateOne({ id: id }, { avatarUrl: avatarPath });
  }
}
