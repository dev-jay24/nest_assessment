import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Roles } from 'src/common/decorators/role/roles.decorator';
import { Role } from 'src/common/constants';
import { ListItemDto } from 'src/product/dto/list-product.dto';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  createTenant(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.createTenant(createTenantDto);
  }

  @Post('list')
  findAllTenant(@Body() body: ListItemDto) {
    return this.tenantService.findAllTenant(body);
  }

  @Post('accepted-list')
  findAcceptedTenant(@Body() body: ListItemDto) {
    return this.tenantService.findAcceptedTenant(body);
  }

  @Post('pending-list')
  findPendingTenant(@Body() body: ListItemDto) {
    return this.tenantService.findPendingTenant(body);
  }

  @Get(':id')
  findOneTenant(@Param('id') id: string) {
    return this.tenantService.findOneTenant(+id);
  }

  @Roles(Role.Admin)
  @Patch()
  updateTenant(@Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.updateTenant(updateTenantDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  removeTenant(@Param('id') id: string) {
    return this.tenantService.removeTenant(+id);
  }
}
