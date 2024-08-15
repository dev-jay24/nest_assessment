import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Tenant } from 'src/tenant/entities/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ListItemDto } from './dto/list-product.dto';
import { commonExceptions } from 'src/common/helper/exception/common.exception';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const tenant = await this.tenantRepository.findOneBy({
      id: createProductDto.tenant_id,
    });
    const product: Product = new Product();
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.description = createProductDto.description;
    product.tenant = tenant;
    return {
      message: 'Product saved successfully',
      data: await this.productRepository.save(product),
    };
  }

  async findAllProduct(body: ListItemDto) {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (body?.search) {
      queryBuilder.andWhere('product.name LIKE :productName', {
        productName: `%${body?.search}%`,
      });
    }

    if (body?.minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice?.', {
        minPrice: body?.minPrice,
      });
    }

    if (body?.maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', {
        maxPrice: body?.maxPrice,
      });
    }

    queryBuilder.skip((body?.page - 1) * body.limit).take(body.limit);

    queryBuilder.orderBy(
      `product.${body?.orderKey ? body?.orderKey : 'name'}`,
      body?.orderBy == 'DESC' ? 'DESC' : 'ASC',
    );
    return {
      message: 'Product fetched successfully',
      data: await queryBuilder.getMany(),
    };
  }

  async findOneProduct(id: number) {
    const res = await this.productRepository.findOneBy({ id });
    if (res === null) {
      throw commonExceptions.ProductDontExists();
    }
    return {
      message: 'Products fetched successfully',
      data: res,
    };
  }

  async findTenantProduct(id: number) {
    const tenant = await this.tenantRepository.findOneBy({ id });
    if (tenant === null) {
      throw commonExceptions.TenantDontExists();
    }
    return {
      message: 'Products fetched successfully',
      data: await this.productRepository.findBy({ tenant }),
    };
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({
      id: updateProductDto.id,
    });
    if (product === null) {
      throw commonExceptions.ProductDontExists();
    }
    return {
      message: 'Product updated successfully',
      data: await this.tenantRepository.save({
        ...product,
        ...updateProductDto,
      }),
    };
  }

  async removeProduct(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (product === null) {
      throw commonExceptions.ProductDontExists();
    }
    await this.productRepository.delete(id);
    return {
      message: 'Product deleted successfully',
    };
  }
}
