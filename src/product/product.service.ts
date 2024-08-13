import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Tenant } from 'src/tenant/entities/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const tenant = await this.tenantRepository.findOneBy({
      id: createProductDto.tenant_id,
    });
    const product: Product = new Product();
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.description = createProductDto.description;
    product.tenant = tenant;
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  async findTenantProduct(id: number) {
    const tenant = await this.tenantRepository.findOneBy({ id });
    return this.productRepository.findBy({ tenant });
  }

  async update(updateProductDto: UpdateProductDto) {
    const property = await this.tenantRepository.findOneBy({
      id: updateProductDto.id,
    });

    return this.tenantRepository.save({
      ...property,
      ...updateProductDto,
    });
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
