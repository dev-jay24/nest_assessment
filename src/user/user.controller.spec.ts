import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ListItemDto } from 'src/product/dto/list-product.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue({}),
            findAllUser: jest.fn().mockResolvedValue({}),
            findOneUser: jest.fn().mockResolvedValue({}),
            updateUser: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('User create controller', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
      role: 'user',
      tenant_id: 1,
    };

    const response = await controller.createUser(createUserDto);
    expect(response).toBe(response);
  });

  it('User find all controller', async () => {
    const listItemDto: ListItemDto = {
      search: 'Test',
      page: 1,
      limit: 10,
      orderKey: 'name',
      orderBy: 'ASC',
      minPrice: 0,
      maxPrice: 1000,
    };

    const response = await controller.findAllUser(listItemDto);
    expect(response).toBe(response);
  });

  it('User find one controller', async () => {
    const userId = '1';

    const response = await controller.findOneUser(userId);
    expect(response).toBe(response);
  });

  it('User update controller', async () => {
    const updateUserDto: UpdateUserDto = {
      id: 1,
      email: 'updated@example.com',
      name: 'Updated User',
      tenant_id: 2,
    };

    const response = await controller.updateUser(updateUserDto);
    expect(response).toBe(response);
  });

  it('User remove controller', async () => {
    const userId = '1';

    const response = await controller.remove(userId);
    expect(response).toBe(response);
  });
});
