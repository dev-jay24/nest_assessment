import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: Number,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  tenant_id: number;

  @ApiProperty({
    required: true,
    type: String,
    default: 'name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    default: 'email',
    pattern: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    default: 'email',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~]{8,}$/,
  )
  password: string;

  @ApiProperty({
    required: true,
    type: String,
    default: 'user',
  })
  @IsNotEmpty()
  @IsString()
  role: string;
}
