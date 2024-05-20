import {
  AuthDatasource,
  AuthRepository,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}
  getAllUsers(): Promise<UserEntity[]> {
    return this.authDatasource.getAllUsers();
  }
  getUserById(id: string): Promise<UserEntity> {
    return this.authDatasource.getUserById(id);
  }
  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }
  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDto);
  }
}
