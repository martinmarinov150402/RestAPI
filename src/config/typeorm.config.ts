import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import * as config from 'config';
import { User } from 'src/auth/user.entity';
const dbConfig = config.get('db');
let uname = process.env.DB_USERNAME;
let pass = process.env.DB_PASSWORD;
let host = process.env.DB_HOST;
let port = Number(process.env.DB_PORT);
let dbname = process.env.DB_DB_NAME;
export const typeOrmConfig:TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB_NAME,
    entities: [Task,User],
    synchronize:Boolean(process.env.DB_SYNC),
};
function asd()
{
    console.log(uname+" "+host+" "+port+" "+pass+" "+dbname);
}
asd();