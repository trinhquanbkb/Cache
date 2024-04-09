import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Orders } from './orders/entities/order.entity';
import { CacheModule } from '@nestjs/cache-manager';

import database from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Orders]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 5000, // 5000 miliseconds
    }),
    OrdersModule,
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
