import { Controller, Post, Body, BadRequestException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRoles } from './enums/user-roles.enum';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
    constructor(private authService:AuthService){};
    @Post('/grant')
    grant(@Body("userid") userid:number, @Body("role") role:string)
    {
        let role1;
        role=role.toUpperCase();
        if(role==="USER")
        {
            role1=UserRoles.User;
        }
        else if(role==="ADMIN")
        {
            role1=UserRoles.Admin;
        }
        else
        {
            throw new BadRequestException('Invalid role');
        }
        return this.authService.grant(userid,role1);
    }
    @Post('/revoke')
    revoke(@Body("userid") userid:number, @Body("role") role:string)
    {
        let role1;
        role=role.toUpperCase();
        if(role==="USER")
        {
            role1=UserRoles.User;
        }
        else if(role==="ADMIN")
        {
            role1=UserRoles.Admin;
        }
        else
        {
            throw new BadRequestException('Invalid role');
        }
        return this.authService.revoke(userid,role1);
    }
    @Post('/myrole')
    myrole(@GetUser() user:User)
    {
        //console.log(user);
        return this.authService.getRole(user);
    }
}
