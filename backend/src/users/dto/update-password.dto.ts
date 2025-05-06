import { IsString, Length, Matches } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/, {
    message: 'New password must include at least one uppercase letter and one special character',
  })
  newPassword: string;
}