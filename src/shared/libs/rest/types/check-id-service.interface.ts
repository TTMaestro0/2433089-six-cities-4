import { Types } from 'mongoose';

export interface CheckIdService {
  checkIdExists(id: Types.ObjectId): Promise<boolean>;
}
