import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import DatabaseConfiguration from './common/configs/database.config';
import { DatabaseModule } from './provider/database/database.module';
import { UserModule } from './user/user.module';
import { TenantModule } from './tenant/tenant.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfiguration],
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    TenantModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
