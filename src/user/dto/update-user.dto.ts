import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: true,
    type: Number,
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    required: false,
    type: String,
    default: 1,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    type: String,
    default: 1,
  })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({
    required: false,
    type: Number,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  tenant_id: number;
}
