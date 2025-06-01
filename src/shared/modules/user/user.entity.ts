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
  @prop({
    required: true,
    minlength: [1, 'Min length for name is 1'],
    maxlength: [15, 'Max length for name is 15']
  })
  public name: string;

  @prop({
    unique: true,
    required: true,
    match: [/^.+@.+$/, 'Email is incorrect']
  })
  public email: string;

  @prop({
    required: false,
    default: '',
    match: [/.*\.(?:jpg|png)/, 'Avatar must be jpg or png']
  })
  public avatar?: string;

  @prop({
    required: false,
    default: UserType.Common,
    type: () => String,
    enum: UserType
  })
  public type: string;

  public favoriteOffers!: string[];

  @prop({
    required: true,
    minlength: [6, 'Min length for password is 6'],
    //maxlength: [12, 'Max length for password is 12'], TODO: delete
  })
  private password?: string;

  constructor(userData: User) {
    super();
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.name = userData.name;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
