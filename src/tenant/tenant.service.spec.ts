import { Test, TestingModule } from '@nestjs/testing';
import { TenantService } from './tenant.service';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tenant } from './entities/tenant.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserTestRepository } from '../../test-cases/test-mock-model/user.mockRepository';
import { TenantTestRepository } from '../../test-cases/test-mock-model/tenant.mockRepository';
import { ProductTestRepository } from '../../test-cases/test-mock-model/product.mockRepository';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { ListItemDto } from 'src/product/dto/list-product.dto';
import { commonExceptions } from 'src/common/helper/exception/common.exception';
import { UpdateTenantDto } from './dto/update-tenant.dto';

describe('TenantService', () => {
  let service: TenantService;
  let userRepository: Repository<User>;
  let tenantRepository: Repository<Tenant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantService,
        {
          provide: getRepositoryToken(User),
          useClass: UserTestRepository,
        },
        {
          provide: getRepositoryToken(Tenant),
          useClass: TenantTestRepository,
        },
        {
          provide: getRepositoryToken(Product),
          useClass: ProductTestRepository,
        },
      ],
    }).compile();

    service = module.get<TenantService>(TenantService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    tenantRepository = module.get<Repository<Tenant>>(
      getRepositoryToken(Tenant),
    );
  });

  describe('createTenant', () => {
    it('should create a tenant successfully', async () => {
      const createTenantDto: CreateTenantDto = {
        name: 'Test User',
      };

      const tenant = new Tenant();
      tenant.name = createTenantDto.name;

      jest.spyOn(tenantRepository, 'save').mockResolvedValue(tenant);

      const result = await service.createTenant(createTenantDto);

      expect(result.message).toBe('Tenant created successfully');
      expect(result.data).toEqual(tenant);
    });
  });

  describe('findAllTenant', () => {
    it('should return a list of all tenant', async () => {
      const listItemDto: ListItemDto = {
        search: 'Test',
        page: 1,
        limit: 10,
        orderKey: 'name',
        orderBy: 'ASC',
      };

      const tenants = [
        { id: 1, name: 'Tenant1', created_at: '2024-01-01', total: 100 },
      ];

      // Mocking createQueryBuilder to return a mocked query builder with getMany method
      const queryBuilder = tenantRepository.createQueryBuilder();
      jest.spyOn(queryBuilder, 'getRawMany').mockResolvedValue(tenants);
      jest
        .spyOn(tenantRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder);

      // Call the service method
      const result = await service.findAllTenant(listItemDto);

      // Assert the result
      expect(result.message).toBe('Tenant fetched successfully');
      expect(result.data).toEqual(tenants);
    });
  });

  describe('findAcceptedTenant', () => {
    it('should return a list of accepted tenant', async () => {
      const listItemDto: ListItemDto = {
        search: 'Test',
        page: 1,
        limit: 10,
        orderKey: 'name',
        orderBy: 'ASC',
      };

      const tenants = [new Tenant()];

      const user = [new User()];

      // Mocking createQueryBuilder to return a mocked query builder with getMany method
      const queryBuilder = tenantRepository.createQueryBuilder();
      const userQueryBuilder = userRepository.createQueryBuilder();

      jest.spyOn(queryBuilder, 'getRawMany').mockResolvedValue(tenants);
      jest.spyOn(userQueryBuilder, 'getRawMany').mockResolvedValue(user);

      jest
        .spyOn(tenantRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder);
      jest
        .spyOn(userRepository, 'createQueryBuilder')
        .mockReturnValue(userQueryBuilder);
      // Call the service method
      const result = await service.findAcceptedTenant(listItemDto);

      // Assert the result
      expect(result.message).toBe('Tenant fetched successfully');
      expect(result.data).toEqual(tenants);
    });
  });

  describe('findPendingTenant', () => {
    it('should return a list of pending tenant', async () => {
      const listItemDto: ListItemDto = {
        search: 'Test',
        page: 1,
        limit: 10,
        orderKey: 'name',
        orderBy: 'ASC',
      };

      const tenants = [new Tenant()];

      const user = [new User()];

      // Mocking createQueryBuilder to return a mocked query builder with getMany method
      const queryBuilder = tenantRepository.createQueryBuilder();
      const userQueryBuilder = userRepository.createQueryBuilder();

      jest.spyOn(queryBuilder, 'getRawMany').mockResolvedValue(tenants);
      jest.spyOn(userQueryBuilder, 'getRawMany').mockResolvedValue(user);

      jest
        .spyOn(tenantRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder);
      jest
        .spyOn(userRepository, 'createQueryBuilder')
        .mockReturnValue(userQueryBuilder);
      // Call the service method
      const result = await service.findPendingTenant(listItemDto);

      // Assert the result
      expect(result.message).toBe('Tenant fetched successfully');
      expect(result.data).toEqual(tenants);
    });
  });

  describe('findOneTenant', () => {
    it('should return a single tenant', async () => {
      const tenantId = 1;
      const tenant = new Tenant();
      tenant.id = tenantId;

      jest.spyOn(tenantRepository, 'findOneBy').mockResolvedValue(tenant);

      const result = await service.findOneTenant(tenantId);

      expect(result.message).toBe('Tenants fetched successfully');
      expect(result.data).toEqual(tenant);
    });

    it('should throw an error if tenant does not exist', async () => {
      const tenantId = 1;

      jest.spyOn(tenantRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOneTenant(tenantId)).rejects.toThrow(
        commonExceptions.TenantDontExists(),
      );
    });
  });

  describe('updateTenant', () => {
    it('should update a user successfully', async () => {
      const updateTenantDto: UpdateTenantDto = {
        id: 1,
        name: 'Updated User',
      };

      const tenant = new Tenant();
      tenant.id = updateTenantDto.id;

      const updatedTenant = { ...tenant, ...updateTenantDto };

      jest.spyOn(tenantRepository, 'findOneBy').mockResolvedValue(tenant);
      jest.spyOn(tenantRepository, 'save').mockResolvedValue(updatedTenant);

      const result = await service.updateTenant(updateTenantDto);

      expect(result.message).toBe('Tenant updated successfully');
      expect(result.data).toEqual(updatedTenant);
    });
  });

  describe('removeTenant', () => {
    it('should delete a tenant successfully', async () => {
      const tenantId = 1;
      const tenant = new Tenant();
      tenant.id = tenantId;

      jest.spyOn(tenantRepository, 'findOneBy').mockResolvedValue(tenant);
      jest
        .spyOn(tenantRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as never);

      const result = await service.removeTenant(tenantId);

      expect(result.message).toBe('Tenant deleted successfully');
    });

    it('should throw an error if tenant does not exist', async () => {
      const tenantId = 1;

      jest.spyOn(tenantRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.removeTenant(tenantId)).rejects.toThrow(
        commonExceptions.TenantDontExists(),
      );
    });
  });
});
