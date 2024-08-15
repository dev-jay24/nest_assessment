import { Product } from 'src/product/entities/product.entity';
import { MockRepository } from '../../test-cases/mock.Repository';

export class ProductTestRepository extends MockRepository<Product> {
  protected entiryStub = new Product();
}
