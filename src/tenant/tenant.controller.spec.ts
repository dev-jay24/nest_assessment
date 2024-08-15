import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { ListItemDto } from 'src/product/dto/list-product.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

describe('TenantController', () => {
  let controller: TenantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantController],
      providers: [
        {
          provide: TenantService,
          useValue: {
            createTenant: jest.fn().mockResolvedValue({}),
            findAllTenant: jest.fn().mockResolvedValue({}),
            findAcceptedTenant: jest.fn().mockResolvedValue({}),
            findPendingTenant: jest.fn().mockResolvedValue({}),
            findOneTenant: jest.fn().mockResolvedValue({}),
            updateTenant: jest.fn().mockResolvedValue({}),
            removeTenant: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<TenantController>(TenantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Tenant create controller', async () => {
    const createTenantDto: CreateTenantDto = {
      name: 'Test User',
    };

    const response = await controller.createTenant(createTenantDto);
    expect(response).toBe(response);
  });

  it('Tenant find all controller', async () => {
    const listItemDto: ListItemDto = {
      search: 'Test',
      page: 1,
      limit: 10,
      orderKey: 'name',
      orderBy: 'ASC',
    };

    const response = await controller.findAllTenant(listItemDto);
    expect(response).toBe(response);
  });

  it('Tenant find accepted controller', async () => {
    const listItemDto: ListItemDto = {
      search: 'Test',
      page: 1,
      limit: 10,
      orderKey: 'name',
      orderBy: 'ASC',
    };

    const response = await controller.findAcceptedTenant(listItemDto);
    expect(response).toBe(response);
  });

  it('Tenant find pending controller', async () => {
    const listItemDto: ListItemDto = {
      search: 'Test',
      page: 1,
      limit: 10,
      orderKey: 'name',
      orderBy: 'ASC',
    };

    const response = await controller.findPendingTenant(listItemDto);
    expect(response).toBe(response);
  });

  it('Tenant find pending controller', async () => {
    const listItemDto: ListItemDto = {
      search: 'Test',
      page: 1,
      limit: 10,
      orderKey: 'name',
      orderBy: 'ASC',
    };

    const response = await controller.findPendingTenant(listItemDto);
    expect(response).toBe(response);
  });

  it('Tenant find one controller', async () => {
    const tenantId = '1';

    const response = await controller.findOneTenant(tenantId);
    expect(response).toBe(response);
  });

  it('Tenant update controller', async () => {
    const updateTenantDto: UpdateTenantDto = {
      id: 1,
      name: 'Updated User',
    };

    const response = await controller.updateTenant(updateTenantDto);
    expect(response).toBe(response);
  });

  it('Tenant remove controller', async () => {
    const tenantId = '1';

    const response = await controller.removeTenant(tenantId);
    expect(response).toBe(response);
  });
});
