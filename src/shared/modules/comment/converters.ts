import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import {Comment} from '../../types/index.js';

export function toFullModel(dbModel: DocumentType<CommentEntity>): Comment {
  return {
    text: dbModel.text,
    createdAt: dbModel.createdAt!,
    rating: dbModel.rating,
    authorId: String(dbModel.authorId)
  };
}
