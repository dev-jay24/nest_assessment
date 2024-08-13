import { IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;
}
