import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    required: true,
    type: Number,
    default: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  tenant_id: number;

  @ApiProperty({
    required: true,
    type: String,
    default: 'Product name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    default: 'Product description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    required: true,
    type: Number,
    default: '100',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
