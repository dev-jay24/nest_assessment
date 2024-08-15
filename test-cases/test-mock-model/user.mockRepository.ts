import { User } from 'src/user/entities/user.entity';
import { MockRepository } from '../../test-cases/mock.Repository';

export class UserTestRepository extends MockRepository<User> {
  protected entiryStub = new User();
}
