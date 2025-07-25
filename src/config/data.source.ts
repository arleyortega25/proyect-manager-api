import 'reflect-metadata'
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
dotenv.config({
  path: `${process.env.NODE_ENV || 'develop'}.env`,
});
const configService = new ConfigService();
export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DBHOST,
  port: Number(process.env.DBPORT),
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};
export const AppDataSource = new DataSource(DataSourceConfig);
