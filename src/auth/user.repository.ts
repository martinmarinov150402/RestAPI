import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';
import { noop } from "rxjs";

@EntityRepository(User)
export class UserRepository extends Repository<User>
{
    async signUp(authCredentialsDto:AuthCredentialsDTO):Promise<void>
    {
        const {username,password} = authCredentialsDto;
        const user = new User();
        const salt=await bcrypt.genSalt();
        user.username=username;
        user.password=await this.hashPassword(password,salt);
        user.salt=salt;
        try
        {
           await user.save(); 
        }
        catch(error)
        {
            console.log(error.code);
        }
        
    }
    private async hashPassword(password:string, salt:string):Promise<string>
    {
        return bcrypt.hash(password,salt);
    }
    signIn(authCredentialsDto:AuthCredentialsDTO):Promise<string>
    {
        return this.validateUserPassword(authCredentialsDto);
    }
    private async validateUserPassword(authCredentialsDto):Promise<string>
    {
        const {username,password} = authCredentialsDto;
        console.log(username);
        const user = await this.findOne({username});
        console.log(user);
        const hashed = await this.hashPassword(password,user.salt);
        console.log("Password: "+user.password+"\nHashed: "+hashed)
        if(user.password===hashed)
        {
            return username;
        }
        else
        {
            return "no";
        }
    }
}