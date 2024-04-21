import { JwtAdapter } from "../../../config/jwt"
import { RegisterUserDto } from "../../dtos/auth/register-user.dto"
import { CustomError } from "../../errors/custom.error"
import { AuthRepository } from "../../repositories/auth.repository"


interface UserToken {
    token: string,
    user:{
        id:string,
        name:string,
        email: string,
        country:string,
        img: string,
    }
}

interface RegisterUserUseCase{
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

export class RegisterUser implements RegisterUserUseCase {
    constructor(
        private readonly authRepositoty: AuthRepository,
        private readonly singToken: SignToken = JwtAdapter.generateToken,
    ) {
        
    }

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        const user = await this.authRepositoty.register(registerUserDto);

        const token = await this.singToken({id: user.id}, '2h');

        if(!token) throw CustomError.internalServer('Error generating token.');


        return {
            token: token,
            user: {
                id:user.id,
                name: user.name,
                email: user.email,
                img: user.img,
                country: user.country
            }
        }
    }
}