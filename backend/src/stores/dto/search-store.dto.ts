import { IsString, IsOptional, IsIn } from 'class-validator';

export class SearchStoreDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  @IsIn(['name', 'email', 'address'])
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';
  
}