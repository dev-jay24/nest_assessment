import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ListItemWithPriceDto } from './dto/list-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            createProduct: jest.fn().mockResolvedValue({}),
            findAllProduct: jest.fn().mockResolvedValue({}),
            findOneProduct: jest.fn().mockResolvedValue({}),
            findTenantProduct: jest.fn().mockResolvedValue({}),
            updateProduct: jest.fn().mockResolvedValue({}),
            removeProduct: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Product create controller', async () => {
    const createProductDto: CreateProductDto = {
      name: 'Test Product',
      price: 100,
      description: 'test product',
      tenant_id: 1,
    };

    const response = await controller.createProduct(createProductDto);
    expect(response).toBe(response);
  });

  it('Product find all controller', async () => {
    const listItemDto: ListItemWithPriceDto = {
      search: 'Test',
      page: 1,
      limit: 10,
      orderKey: 'name',
      orderBy: 'ASC',
      minPrice: 0,
      maxPrice: 1000,
    };

    const response = await controller.findAllProduct(listItemDto);
    expect(response).toBe(response);
  });

  it('Product find one controller', async () => {
    const productId = '1';

    const response = await controller.findOneProduct(productId);
    expect(response).toBe(response);
  });

  it('Tenant Product find controller', async () => {
    const tenantId = '1';

    const response = await controller.findTenantProduct(tenantId);
    expect(response).toBe(response);
  });

  it('Product update controller', async () => {
    const updateProductDto: UpdateProductDto = {
      id: 1,
      name: 'test product',
      description: 'test product',
      price: 100,
    };

    const response = await controller.updateProduct(updateProductDto);
    expect(response).toBe(response);
  });

  it('Product remove controller', async () => {
    const tenantId = '1';

    const response = await controller.removeProduct(tenantId);
    expect(response).toBe(response);
  });
});
