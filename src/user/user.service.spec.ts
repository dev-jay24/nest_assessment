import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Tenant } from '../tenant/entities/tenant.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListItemDto } from '../product/dto/list-product.dto';
import { commonExceptions } from '../common/helper/exception/common.exception';
import { UserTestRepository } from '../../test-cases/test-mock-model/user.mockRepository';
import { TenantTestRepository } from '../../test-cases/test-mock-model/tenant.mockRepository';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let tenantRepository: Repository<Tenant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserTestRepository,
        },
        {
          provide: getRepositoryToken(Tenant),
          useClass: TenantTestRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    tenantRepository = module.get<Repository<Tenant>>(
      getRepositoryToken(Tenant),
    );
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password',
        role: 'user',
        tenant_id: 1,
      };

      const tenant = new Tenant();
      tenant.id = 1;

      const user = new User();
      user.email = createUserDto.email;
      user.name = createUserDto.name;
      user.password = await bcrypt.hash(createUserDto.password, 10);
      user.role = createUserDto.role;
      user.tenant = tenant;

      jest.spyOn(tenantRepository, 'findOneBy').mockResolvedValue(tenant);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await service.createUser(createUserDto);

      expect(result.message).toBe('User created successfully');
      expect(result.data).toEqual(user);
    });
  });

  describe('findAllUser', () => {
    it('should return a list of users', async () => {
      const listItemDto: ListItemDto = {
        search: 'Test',
        page: 1,
        limit: 10,
        orderKey: 'name',
        orderBy: 'ASC',
      };

      const users = [new User()];

      // Mocking createQueryBuilder to return a mocked query builder with getMany method
      const queryBuilder = userRepository.createQueryBuilder();
      jest.spyOn(queryBuilder, 'getMany').mockResolvedValue(users);
      jest
        .spyOn(userRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder);

      // Call the service method
      const result = await service.findAllUser(listItemDto);

      // Assert the result
      expect(result.message).toBe('Users fetched successfully');
      expect(result.data).toEqual(users);
    });
  });

  describe('findOneUser', () => {
    it('should return a single user', async () => {
      const userId = 1;
      const user = new User();
      user.id = userId;

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      const result = await service.findOneUser(userId);

      expect(result.message).toBe('User fetched successfully');
      expect(result.data).toEqual(user);
    });

    it('should throw an error if user does not exist', async () => {
      const userId = 1;

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOneUser(userId)).rejects.toThrow(
        commonExceptions.UserDontExists(),
      );
    });
  });

  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      const updateUserDto: UpdateUserDto = {
        id: 1,
        email: 'updated@example.com',
        name: 'Updated User',
        tenant_id: 2,
      };

      const user = new User();
      user.id = updateUserDto.id;

      const tenant = new Tenant();
      tenant.id = 2;

      const updatedUser = { ...user, ...updateUserDto, tenant };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);
      jest.spyOn(tenantRepository, 'findOneBy').mockResolvedValue(tenant);
      jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser);

      const result = await service.updateUser(updateUserDto);

      expect(result.message).toBe('User updated successfully');
      expect(result.data).toEqual(updatedUser);
    });

    it('should throw an error if user does not exist', async () => {
      const updateUserDto: UpdateUserDto = {
        id: 1,
        name: '',
        email: '',
        tenant_id: 0,
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.updateUser(updateUserDto)).rejects.toThrow(
        commonExceptions.UserDontExists(),
      );
    });
  });

  describe('remove', () => {
    it('should delete a user successfully', async () => {
      const userId = 1;
      const user = new User();
      user.id = userId;

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);
      jest
        .spyOn(userRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as never);

      const result = await service.remove(userId);

      expect(result.message).toBe('User deleted successfully');
    });

    it('should throw an error if user does not exist', async () => {
      const userId = 1;

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.remove(userId)).rejects.toThrow(
        commonExceptions.UserDontExists(),
      );
    });
  });
});
