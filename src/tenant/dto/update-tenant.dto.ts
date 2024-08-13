import { IsNotEmpty } from 'class-validator';

export class UpdateTenantDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;
}
