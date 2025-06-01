import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public name!: string;
}
