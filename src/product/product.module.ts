import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { Tenant } from 'src/tenant/entities/tenant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Tenant])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
