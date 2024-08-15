import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTenantDto {
  @ApiProperty({
    required: true,
    type: Number,
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    required: true,
    type: String,
    default: 'Tenant name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
