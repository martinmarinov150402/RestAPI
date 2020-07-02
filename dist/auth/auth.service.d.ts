import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDTO): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDTO): Promise<{
        accessToken: string;
    }>;
}
