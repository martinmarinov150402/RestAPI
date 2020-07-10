import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as config from 'config';
import { ConfigService } from '@nestjs/config';
import {configObject} from '../config.object';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        //private configService:ConfigService,
    )
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configObject.jwt_secret,
        });
        console.log("Check secret: "+configObject.jwt_secret);
    }
    async validate(payload: JwtPayload):Promise<User>
    {
        console.log("TUKA");
        const {username} = payload;
        console.log(username);
        const user = await this.userRepository.findOne({username});
        console.log("HUIZAVSICHKOIVSICHKI: "+user);
        if(!user)
        {
            throw new UnauthorizedException();
        }
        return user;
    }
}