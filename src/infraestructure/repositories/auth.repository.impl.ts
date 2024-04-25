import { AuthDatasource, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        private readonly authDatasource: AuthDatasource,
    ) {
        
    }
    getAllUsers(): Promise<UserEntity[]> {
        return this.authDatasource.getAllUsers();
    }
    getUserById(id: string): Promise<UserEntity> {
        return this.authDatasource.getUserById(id);
    }
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }
}