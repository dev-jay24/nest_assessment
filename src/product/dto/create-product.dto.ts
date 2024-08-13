import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  tenant_id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;
}
