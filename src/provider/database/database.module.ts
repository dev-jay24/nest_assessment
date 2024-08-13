import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Tenant } from 'src/tenant/entities/tenant.entity';
import { User } from 'src/user/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options: PostgresConnectionOptions = {
          type: configService.get('database.type'),
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          entities: [User, Tenant, Product],
          synchronize: true,
        };
        return options;
      },
    }),
  ],
})
export class DatabaseModule {}
