import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Tenant } from 'src/tenant/entities/tenant.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TenantTestRepository } from '../../test-cases/test-mock-model/tenant.mockRepository';
import { ProductTestRepository } from '../../test-cases/test-mock-model/product.mockRepository';
import { CreateProductDto } from './dto/create-product.dto';
import { ListItemDto } from './dto/list-product.dto';
import { commonExceptions } from 'src/common/helper/exception/common.exception';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<Product>;
  let tenantRepository: Repository<Tenant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: ProductTestRepository,
        },
        {
          provide: getRepositoryToken(Tenant),
          useClass: TenantTestRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    tenantRepository = module.get<Repository<Tenant>>(
      getRepositoryToken(Tenant),
    );
  });

  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: 100,
        description: 'test product',
        tenant_id: 1,
      };

      const tenant = new Tenant();
      tenant.id = 1;

      const product = new Product();
      product.name = createProductDto.name;
      product.description = createProductDto.description;
      product.price = createProductDto.price;
      product.tenant = tenant;

      jest.spyOn(tenantRepository, 'findOneBy').mockResolvedValue(tenant);
      jest.spyOn(productRepository, 'save').mockResolvedValue(product);

      const result = await service.createProduct(createProductDto);

      expect(result.message).toBe('Product saved successfully');
      expect(result.data).toEqual(product);
    });
  });

  describe('findAllProduct', () => {
    it('should return a list of products', async () => {
      const listItemDto: ListItemDto = {
        search: 'Test',
        page: 1,
        limit: 10,
        orderKey: 'name',
        orderBy: 'ASC',
        minPrice: 0,
        maxPrice: 1000,
      };

      const products = [new Product()];

      const queryBuilder = productRepository.createQueryBuilder();
      jest.spyOn(queryBuilder, 'getMany').mockResolvedValue(products);
      jest
        .spyOn(productRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder);

      // Call the service method
      const result = await service.findAllProduct(listItemDto);

      // Assert the result
      expect(result.message).toBe('Product fetched successfully');
      expect(result.data).toEqual(products);
    });
  });

  describe('findOneProduct', () => {
    it('should return a single product', async () => {
      const productId = 1;
      const product = new Product();
      product.id = productId;

      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(product);

      const result = await service.findOneProduct(productId);

      expect(result.message).toBe('Products fetched successfully');
      expect(result.data).toEqual(product);
    });

    it('should throw an error if product does not exist', async () => {
      const productId = 1;

      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOneProduct(productId)).rejects.toThrow(
        commonExceptions.ProductDontExists(),
      );
    });
  });

  describe('findTenantProduct', () => {
    it('should return a list of requested tenant products', async () => {
      const tenantId = 1;
      const tenant = new Tenant();
      tenant.id = tenantId;

      const products = [new Product()];

      jest.spyOn(tenantRepository, 'findOneBy').mockResolvedValue(tenant);
      jest.spyOn(productRepository, 'findBy').mockResolvedValue(products);

      const result = await service.findTenantProduct(tenantId);

      expect(result.message).toBe('Products fetched successfully');
      expect(result.data).toEqual(products);
    });

    it('should throw an error if tenant does not exist', async () => {
      const tenantId = 1;

      jest.spyOn(tenantRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findTenantProduct(tenantId)).rejects.toThrow(
        commonExceptions.TenantDontExists(),
      );
    });
  });

  describe('updateProduct', () => {
    it('should update a product successfully', async () => {
      const updateProductDto: UpdateProductDto = {
        id: 1,
        name: 'test product',
        description: 'test product',
        price: 100,
      };

      const product = new Product();
      product.id = updateProductDto.id;

      const updatedProduct = { ...product, ...updateProductDto };

      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(product);
      jest.spyOn(productRepository, 'save').mockResolvedValue(updatedProduct);

      const result = await service.updateProduct(updateProductDto);

      expect(result.message).toBe('Product updated successfully');
      expect(result.data).toEqual(updatedProduct);
    });

    it('should throw an error if product does not exist', async () => {
      const updateProductDto: UpdateProductDto = {
        id: 1,
        name: 'test product',
        description: 'test product',
        price: 100,
      };

      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.updateProduct(updateProductDto)).rejects.toThrow(
        commonExceptions.ProductDontExists(),
      );
    });
  });

  describe('removeProduct', () => {
    it('should delete product ', async () => {
      const productId = 1;
      const product = new Product();
      product.id = productId;

      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(product);

      jest
        .spyOn(productRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as never);

      const result = await service.removeProduct(productId);

      expect(result.message).toBe('Product deleted successfully');
    });

    it('should throw an error if product does not exist', async () => {
      const productId = 1;

      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.removeProduct(productId)).rejects.toThrow(
        commonExceptions.ProductDontExists(),
      );
    });
  });
});
