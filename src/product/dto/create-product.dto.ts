import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    required: true,
    type: Number,
    default: '1',
  })
  @IsNotEmpty()
  tenant_id: number;

  @ApiProperty({
    required: true,
    type: String,
    default: 'Product name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    default: 'Product description',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    required: true,
    type: Number,
    default: '100',
  })
  @IsNotEmpty()
  price: number;
}
