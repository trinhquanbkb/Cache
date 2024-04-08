import { Logger } from '@nestjs/common';
import { join } from 'path';
import { Orders } from '../orders/entities/order.entity';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const dbConfig = {
  type: 'postgres',
  host: `${process.env.POSTGRES_HOST}`,
  port: parseInt(process.env.POSTGRES_PORT),
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DB}`,
  //   ssl: process.env.POSTGRES_SSL === 'true',
  entities: [Orders],
  synchronize: true,
  dropSchema: false,
  migrationsRun: false,
  logging: true,
  migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
  cli: {
    migrationsDir: join(__dirname, '../migrations'),
    entitiesDir: join(__dirname, '../**/*.entity{.ts,.js}'),
  },
};

export default registerAs('database', () => dbConfig);
export const connectionSource = new DataSource(dbConfig as DataSourceOptions);
