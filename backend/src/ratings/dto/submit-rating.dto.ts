import { IsString, IsInt, Min, Max } from 'class-validator';

export class SubmitRatingDto {
  @IsString()
  storeId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}