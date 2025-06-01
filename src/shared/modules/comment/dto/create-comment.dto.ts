import { IsDateString, IsMongoId, IsNumber, IsString, Length } from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';

export default class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(5, 1024, { message: 'min is 5, max is 1024' })
  public text!: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId!: string;

  @IsMongoId({ message: CreateCommentMessages.userId.invalidFormat })
  public userId!: string;

  @IsDateString({}, { message: CreateCommentMessages.date.invalidFormat })
  public date!: Date;

  @IsNumber({}, { message: CreateCommentMessages.rating.invalidFormat })
  @Length(1, 5, { message: CreateCommentMessages.rating.lengthField })
  public rating!: number;
}
