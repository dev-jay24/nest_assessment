import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Tenant } from 'src/tenant/entities/tenant.entity';
import * as bcrypt from 'bcrypt';

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
    return this.userRepository.save(user);
  }

  findAllUser() {
    return this.userRepository.find();
  }

  findOneUser(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const property = await this.userRepository.findOneBy({
      id: updateUserDto.id,
    });

    return this.userRepository.save({
      ...property,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
