import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { commonExceptions } from 'src/common/helper/exception/common.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async SignIn(body: SignInDto) {
    const user = await this.userRepository.findOneBy({ email: body.email });
    if (!user) {
      throw commonExceptions.UserDontExists();
    }
    const { password, ...userData } = user;
    if (!bcrypt.compareSync(body.password, password)) {
      throw commonExceptions.InvalidPassAndEmail();
    }

    return {
      message: 'User SignIn succesfully',
      data: { ...userData, accessToken: this.generateAuthToken(user) },
    };
  }

  generateAuthToken(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
