import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/common/constants';
import { AuthExceptions } from 'src/common/helper/exception/auth.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw AuthExceptions.ForbiddenException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT.secret'),
      });

      request['user'] = payload;
    } catch (error) {
      switch (error?.name) {
        case 'TokenExpiredError':
          throw AuthExceptions.TokenExpired();
        case 'JsonWebTokenError':
          throw AuthExceptions.InvalidToken();
        default:
          throw AuthExceptions.ForbiddenException();
      }
    }
    return true;
  }

  private extractTokenFromHeader(
    request: Request & { headers: { authorization: string } },
  ): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
