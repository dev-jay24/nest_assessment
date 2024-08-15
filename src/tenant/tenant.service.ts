import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Repository } from 'typeorm';
import { ListItemDto } from 'src/product/dto/list-product.dto';
import { commonExceptions } from 'src/common/helper/exception/common.exception';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createTenant(createTenantDto: CreateTenantDto) {
    const date = new Date();
    const tenant: Tenant = new Tenant();
    tenant.name = createTenantDto.name;
    tenant.created_at = date;
    return {
      message: 'Tenant created successfully',
      data: await this.tenantRepository.save(tenant),
    };
  }

  async findAllTenant(body: ListItemDto) {
    const queryBuilder = this.tenantRepository
      .createQueryBuilder('tenant')
      .select('tenant.id', 'id')
      .addSelect('tenant.name', 'name')
      .addSelect('tenant.created_at', 'created_at');

    if (body?.search) {
      queryBuilder.andWhere('tenant.name LIKE :tenantName', {
        tenantName: `%${body?.search}%`,
      });
    }

    queryBuilder.skip((body.page - 1) * body.limit).take(body.limit);

    const subQueryResult = await queryBuilder.getRawMany();

    const tenantIds = subQueryResult.map((tenant) => tenant.id);

    const finalQuery = this.tenantRepository
      .createQueryBuilder('tenant')
      .leftJoinAndSelect('tenant.products', 'product')
      .select('tenant.id', 'id')
      .addSelect('tenant.name', 'name')
      .addSelect('SUM(product.price)', 'total')
      .addSelect('tenant.created_at', 'created_at')
      .where('tenant.id IN (:...tenantIds)', { tenantIds })
      .groupBy('tenant.id')
      .orderBy(
        `${body?.orderKey ? body?.orderKey : 'name'}`,
        body?.orderBy === 'DESC' ? 'DESC' : 'ASC',
      );

    const res = await finalQuery.getRawMany();
    console.log('res: ', res);

    return {
      message: 'Tenant fetched successfully',
      data: res.map((item) => ({
        ...item,
        total: parseFloat(item.total) || 0,
      })),
    };
  }

  async findAcceptedTenant(body: ListItemDto) {
    const userQueryBuilder = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tenant', 'tenant')
      .where('user.tenant IS NOT NULL')
      .select('DISTINCT user.tenantId', 'id')
      .getRawMany();

    const tenantId = userQueryBuilder.map((tenant) => tenant.id);

    const queryBuilder = this.tenantRepository
      .createQueryBuilder('tenant')
      .where('tenant.id IN (:...userId)', { tenantId })
      .select('tenant.id', 'id')
      .addSelect('tenant.name', 'name')
      .addSelect('tenant.created_at', 'created_at');

    if (body?.search) {
      queryBuilder.andWhere('tenant.name LIKE :tenantName', {
        tenantName: `%${body?.search}%`,
      });
    }

    queryBuilder.skip((body.page - 1) * body.limit).take(body.limit);

    const subQueryResult = await queryBuilder.getRawMany();

    return {
      message: 'Tenant fetched successfully',
      data: subQueryResult,
    };
  }

  async findPendingTenant(body: ListItemDto) {
    const userQueryBuilder = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tenant', 'tenant')
      .where('user.tenant IS NOT NULL')
      .select('DISTINCT user.tenantId', 'id')
      .getRawMany();

    const userId = userQueryBuilder.map((tenant) => tenant.id);

    const queryBuilder = this.tenantRepository
      .createQueryBuilder('tenant')
      .where('tenant.id NOT IN (:...userId)', { userId })
      .select('tenant.id', 'id')
      .addSelect('tenant.name', 'name')
      .addSelect('tenant.created_at', 'created_at');

    if (body?.search) {
      queryBuilder.andWhere('tenant.name LIKE :tenantName', {
        tenantName: `%${body?.search}%`,
      });
    }

    queryBuilder.skip((body.page - 1) * body.limit).take(body.limit);

    const subQueryResult = await queryBuilder.getRawMany();

    return {
      message: 'Tenant fetched successfully',
      data: subQueryResult,
    };
  }

  async findOneTenant(id: number) {
    const res = await this.tenantRepository.findOneBy({ id });
    if (res === null) {
      throw commonExceptions.TenantDontExists();
    }
    return {
      message: 'Tenants fetched successfully',
      data: res,
    };
  }

  async updateTenant(updateTenantDto: UpdateTenantDto) {
    const tenant = await this.tenantRepository.findOneBy({
      id: updateTenantDto.id,
    });
    if (tenant === null) {
      throw commonExceptions.TenantDontExists();
    }

    return {
      message: 'Tenant updated successfully',
      data: await this.tenantRepository.save({
        ...tenant,
        ...updateTenantDto,
      }),
    };
  }

  async removeTenant(id: number) {
    const tenant = await this.tenantRepository.findOneBy({ id });
    if (tenant === null) {
      throw commonExceptions.TenantDontExists();
    }
    await this.userRepository.delete({ tenant: { id } });
    await this.productRepository.delete({ tenant: { id } });
    await this.tenantRepository.delete(id);
    return {
      message: 'Tenant deleted successfully',
    };
  }
}
