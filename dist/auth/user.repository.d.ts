import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
export declare class UserRepository extends Repository<User> {
    signUp(authCredentialsDto: AuthCredentialsDTO): Promise<void>;
    private hashPassword;
    signIn(authCredentialsDto: AuthCredentialsDTO): Promise<string>;
    private validateUserPassword;
}
