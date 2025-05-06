import { IsString, Length, IsEmail } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @Length(20, 60)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(0, 400)
  address: string;

  @IsString()
  ownerId: string;
}