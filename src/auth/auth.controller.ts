import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    
    constructor(private authService:AuthService){}
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDTO):Promise<void>
    {
        return this.authService.signUp(authCredentialsDto);
    }
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDTO):Promise<{accessToken:string}>
    {
        return this.authService.signIn(authCredentialsDto);
    }
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user:User,@Req() req) {
        console.log(user);
        /*console.log(req.user);*/
    }
}
