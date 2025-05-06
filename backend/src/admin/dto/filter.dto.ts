import { IsString, IsOptional, IsIn } from 'class-validator';

export class FilterDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  @IsIn(['ADMIN', 'USER', 'STORE_OWNER'])
  role?: string;

  @IsString()
  @IsOptional()
  @IsIn(['name', 'email', 'address'])
  sortBy?: string;

  @IsOptional()
    @IsIn(['ASC', 'DESC'])
    order?: 'ASC' | 'DESC';

}