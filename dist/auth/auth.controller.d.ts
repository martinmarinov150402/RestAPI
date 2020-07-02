import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDTO): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDTO): Promise<{
        accessToken: string;
    }>;
    test(user: User, req: any): void;
}
