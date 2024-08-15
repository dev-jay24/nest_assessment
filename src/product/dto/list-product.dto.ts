import { IsNotEmpty, IsOptional } from 'class-validator';

export class ListItemDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;

  @IsOptional()
  search: string;

  @IsOptional()
  minPrice: number;

  @IsOptional()
  maxPrice: number;

  @IsOptional()
  orderKey: string;

  @IsOptional()
  orderBy: string;
}
