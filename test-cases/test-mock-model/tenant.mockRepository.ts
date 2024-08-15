import { Tenant } from 'src/tenant/entities/tenant.entity';
import { MockRepository } from '../../test-cases/mock.Repository';

export class TenantTestRepository extends MockRepository<Tenant> {
  protected entiryStub = new Tenant();
}
