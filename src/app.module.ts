import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import DatabaseConfiguration from './common/configs/database.config';
import { DatabaseModule } from './provider/database/database.module';
import { UserModule } from './user/user.module';
import { TenantModule } from './tenant/tenant.module';
import { ProductModule } from './product/product.module';
import JwtConfiguration from './common/configs/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth-guard/auth-guard.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfiguration, JwtConfiguration],
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    JwtModule,
    DatabaseModule,
    UserModule,
    TenantModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
