import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({
    required: true,
    type: String,
    default: 'Tenant name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
