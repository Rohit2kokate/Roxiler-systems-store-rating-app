import { IsString, Length, IsEmail, Matches, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(20, 60)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/, {
    message: 'Password must include at least one uppercase letter and one special character',
  })
  password: string;

  @IsString()
  @Length(0, 400)
  address: string;

  @IsString()
  @IsIn(['ADMIN', 'USER', 'STORE_OWNER'])
  role: 'ADMIN' | 'USER' | 'STORE_OWNER';
}