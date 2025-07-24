import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
ConfigModule.forRoot({
    envFilePath:`${process.env.NODE_ENV}.env`
})
const configService = new ConfigService()
export const DataSourceConfig:DataSourceOptions={
    type: 'postgres',
    host:configService.get('DBHOST'),
    port:configService.get('DBPORT'),
    username:configService.get('DBUSER'),
    password:configService.get('DBPASSWORD'),
    database:configService.get('DBNAME'),
    entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy

}