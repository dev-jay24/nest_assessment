import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Role } from 'src/common/constants';
import { Roles } from 'src/common/decorators/role/roles.decorator';
import { ListItemWithPriceDto } from './dto/list-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Post('list')
  findAllProduct(@Body() body: ListItemWithPriceDto) {
    return this.productService.findAllProduct(body);
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.productService.findOneProduct(+id);
  }

  @Get('tenant/:id')
  findTenantProduct(@Param('id') id: string) {
    return this.productService.findTenantProduct(+id);
  }

  @Roles(Role.Admin)
  @Patch()
  updateProduct(@Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(updateProductDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(+id);
  }
}
