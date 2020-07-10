import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './jwt-strategy';
//import * as config from 'config';
import {configObject} from '../config.object'
import { ConfigService, ConfigModule } from '@nestjs/config';

//const jwtConfig = config.get('jwt');
const configService = new ConfigService();
@Module({
  imports: [
    //ConfigModule.forFeature({})
    PassportModule.register({defaultStrategy: 'jwt'}),
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: configObject.jwt_secret,
      signOptions: {
        expiresIn: 3600,
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule,
  ],
})
export class AuthModule {
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
      //console.log(configObject.jwt_secret);
        /*configObject = 
        {
          db_name:this.configService.get<string>('DB_DB_NAME'),
          db_password:this.configService.get<string>('DB_PASSWORD'),
          db_username:this.configService.get<string>('DB_USERNAME'),
          db_host:this.configService.get<string>('DB_HOST'),
          db_port:this.configService.get<number>('DB_PORT'),
          jwt_secret:this.configService.get<string>('JWT_SECRET'),
        };*/
    console.log("Sign secret: "+configObject.jwt_secret);
  }
}
