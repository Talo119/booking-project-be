import { BcryptAdapter } from "../../config/bcrypt";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
// type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    ) {
        
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {name,email, password, img,country,roles} = registerUserDto;

        try {
            const isUserExists = await UserModel.findOne({email: email});
            if(isUserExists) throw CustomError.badRequest('User already exists.');

            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password),
                img: img,
                country: country,
                roles: roles,
            })

            await user.save();
            return UserMapper.UserEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error
            }
            throw CustomError.internalServer();
        }
    }
}