import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserTestRepository } from '../../test-cases/test-mock-model/user.mockRepository';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: UserTestRepository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockImplementation(() => 'jwtToken'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'Test@123',
      };

      const user = new User();
      user.email = signInDto.email;
      user.password = signInDto.password;
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);
      jest
        .spyOn(service, 'generateAuthToken')
        .mockReturnValue('jwtToken' as never);

      const result = await service.SignIn(signInDto);

      expect(result.message).toBe('User SignIn succesfully');
      expect(result.data).toEqual({
        email: user.email,
        accessToken: 'jwtToken',
      });
    });
  });
});
