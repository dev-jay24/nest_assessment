import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  tenant_id: number;
}
