import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import {Comment} from '../../types/index.js';
import {UserEntity} from '../user/index.js';
import { toFullModel as toFullUserModel } from '../user/converters.js';

export function toFullModel(dbModel: DocumentType<CommentEntity>, userModel: DocumentType<UserEntity>, host: string): Comment {
  return {
    id: dbModel.id.toString(),
    text: dbModel.text,
    createdAt: dbModel.createdAt!,
    rating: dbModel.rating,
    author: toFullUserModel(userModel, host)
  };
}
