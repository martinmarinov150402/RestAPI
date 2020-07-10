import { Module } from '@nestjs/common';
import {configObject} from '../config.object';
import { ConfigService } from '@nestjs/config';

@Module({})
export class FillModule {
    constructor(private configService:ConfigService)
    {
        configObject.db_username=this.configService.get<string>('DB_USERNAME');
        configObject.db_password=this.configService.get<string>('DB_PASSWORD');
        configObject.db_host=this.configService.get<string>('DB_HOST');
        configObject.db_port=this.configService.get<number>('DB_PORT');
        configObject.jwt_secret = this.configService.get<string>('JWT_SECRET');
        configObject.db_name=this.configService.get<string>('DB_DB_NAME');
        configObject.port = this.configService.get<number>('PORT');
        configObject.db_sync = this.configService.get<boolean>('DB_SYNC');
    }
}
