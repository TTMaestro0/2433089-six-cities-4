import { createSHA256 } from '../../helpers/hash.js';
import { User, UserType } from '../../types/index.js';
import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatar: string;

  @prop({ required: true, default: '' })
  public firstName: string;

  @prop({ required: true, default: '' })
  public lastName: string;

  @prop({ required: false, default: UserType.common })
  public type: UserType;

  @prop({ required: true, default: '' })
  private password?: string;

  constructor(userData: User) {
    super();
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
