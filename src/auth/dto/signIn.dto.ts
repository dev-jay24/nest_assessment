import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~]{8,}$/,
  )
  password: string;
}
