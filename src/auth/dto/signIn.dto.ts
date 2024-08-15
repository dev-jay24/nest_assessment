import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignInDto {
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
    default: 'password',
    pattern:
      '/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()_+{}[]:;<>,.?~])[A-Za-zd!@#$%^&*()_+{}[]:;<>,.?~]{8,}$/',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~]{8,}$/,
  )
  password: string;
}
