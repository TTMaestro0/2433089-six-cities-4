import {DocumentType} from '@typegoose/typegoose';
import {UserEntity} from './user.entity.js';
import {User} from '../../types/index.js';


export function toFullModel(dbModel: DocumentType<UserEntity>): User {
  return {
    id: String(dbModel._id),
    name: dbModel.name,
    avatar: dbModel.avatar,
    type: dbModel.type,
    email: dbModel.email
  };
}
