import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  create(createTenantDto: CreateTenantDto) {
    const date = new Date();
    const tenant: Tenant = new Tenant();
    tenant.name = createTenantDto.name;
    tenant.created_at = date;
    return this.tenantRepository.save(tenant);
  }

  findAll() {
    return this.tenantRepository.find();
  }

  findOne(id: number) {
    return this.tenantRepository.findOneBy({ id });
  }

  async update(updateTenantDto: UpdateTenantDto) {
    const property = await this.tenantRepository.findOneBy({
      id: updateTenantDto.id,
    });

    return this.tenantRepository.save({
      ...property,
      ...updateTenantDto,
    });
  }

  remove(id: number) {
    return this.tenantRepository.delete(id);
  }
}
