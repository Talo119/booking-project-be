import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  abstract getAllUsers(): Promise<UserEntity[]>;
  abstract getUserById(id: string): Promise<UserEntity>;
}
