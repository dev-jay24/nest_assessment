import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ListItemDto {
  @ApiProperty({
    required: true,
    type: Number,
    default: '1',
  })
  @IsNotEmpty()
  @IsNumber()
  page: number;

  @ApiProperty({
    required: true,
    type: Number,
    default: '10',
  })
  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @ApiProperty({
    required: false,
    type: String,
    default: '',
  })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({
    required: false,
    type: String,
    default: '',
  })
  @IsOptional()
  @IsString()
  orderKey: string;

  @ApiProperty({
    required: false,
    type: String,
    default: '',
  })
  @IsOptional()
  @IsString()
  orderBy: string;
}

export class ListItemWithPriceDto extends ListItemDto {
  @ApiProperty({
    required: false,
    type: Number,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  minPrice: number;

  @ApiProperty({
    required: false,
    type: Number,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  maxPrice: number;
}
