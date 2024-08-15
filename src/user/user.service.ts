import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Tenant } from 'src/tenant/entities/tenant.entity';
import * as bcrypt from 'bcrypt';
import { ListItemDto } from 'src/product/dto/list-product.dto';
import { commonExceptions } from 'src/common/helper/exception/common.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const tenant = await this.tenantRepository.findOneBy({
      id: createUserDto.tenant_id,
    });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(createUserDto.password, salt);

    const user: User = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = hash;
    user.role = createUserDto.role;
    user.tenant = tenant;

    return {
      message: 'User created successfully',
      data: await this.userRepository.save(user),
    };
  }

  async findAllUser(body: ListItemDto) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (body?.search) {
      queryBuilder.andWhere('user.name LIKE :userName', {
        userName: `%${body?.search}%`,
      });
    }

    queryBuilder.skip((body?.page - 1) * body.limit).take(body.limit);

    queryBuilder.orderBy(
      `user.${body?.orderKey ? body?.orderKey : 'name'}`,
      body?.orderBy == 'DESC' ? 'DESC' : 'ASC',
    );

    return {
      message: 'Users fetched successfully',
      data: await queryBuilder.getMany(),
    };
  }

  async findOneUser(id: number) {
    const res = await this.userRepository.findOneBy({ id });
    if (res === null) {
      throw commonExceptions.UserDontExists();
    }
    return {
      message: 'User fetched successfully',
      data: res,
    };
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({
      id: updateUserDto.id,
    });

    if (!user) {
      throw commonExceptions.UserDontExists();
    }

    let tenant: Tenant | null = null;
    if (updateUserDto.tenant_id) {
      tenant = await this.tenantRepository.findOneBy({
        id: updateUserDto.tenant_id,
      });
      delete updateUserDto.tenant_id;
      if (!tenant) {
        throw commonExceptions.TenantDontExists();
      }
    }

    const updatedUser = {
      ...user,
      ...updateUserDto,
      tenant,
    };

    const result = await this.userRepository.save(updatedUser);

    return {
      message: 'User updated successfully',
      data: result,
    };
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (user === null) {
      throw commonExceptions.UserDontExists();
    }
    await this.userRepository.delete(id);
    return {
      message: 'User deleted successfully',
    };
  }
}
