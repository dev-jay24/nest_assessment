import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ListItemDto {
  @ApiProperty({
    required: true,
    type: Number,
    default: '1',
  })
  @IsNotEmpty()
  page: number;

  @ApiProperty({
    required: true,
    type: Number,
    default: '10',
  })
  @IsNotEmpty()
  limit: number;

  @ApiProperty({
    required: false,
    type: String,
    default: '',
  })
  @IsOptional()
  search: string;

  @ApiProperty({
    required: false,
    type: String,
    default: '',
  })
  @IsOptional()
  orderKey: string;

  @ApiProperty({
    required: false,
    type: String,
    default: '',
  })
  @IsOptional()
  orderBy: string;
}

export class ListItemWithPriceDto extends ListItemDto {
  @ApiProperty({
    required: false,
    type: Number,
    default: 0,
  })
  @IsOptional()
  minPrice: number;

  @ApiProperty({
    required: false,
    type: Number,
    default: 0,
  })
  @IsOptional()
  maxPrice: number;
}
