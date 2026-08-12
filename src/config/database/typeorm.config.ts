import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import 'dotenv/config';

const dbConfig: TypeOrmModuleOptions = {
    /* 
        Here If I use process.env it wo'nt work becasue undefined even "ConfigModule isGlobal true & in main.ts i could access
        to -> console.log(process.env.NODE_ENV); but "/config/database.config.ts" here no. so i will use  "dotenv" and later see other approch"
    */

    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    synchronize: true,

    // entities: [Category, Product, User] or do "autoLoadEntities"
    autoLoadEntities: true,
}

export default dbConfig;