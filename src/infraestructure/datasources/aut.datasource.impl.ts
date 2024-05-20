import { BcryptAdapter } from "../../config/bcrypt";
import { UserModel } from "../../data/mongodb";
import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
  ) {}
  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const {email, password} = loginUserDto;
    try {
      const user = await UserModel.findOne({email: email});
      if(!user) throw CustomError.badRequest('User don´t exists.');

      const validPassword = this.comparePassword(password, user.password);
      if(!validPassword) throw CustomError.badRequest('Email or password invalid.');

      return UserMapper.UserEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      const users = await UserModel.find().populate("country");
      console.log("users", users);
      return users.map((user) => UserMapper.UserEntityFromObject(user));
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async getUserById(id: string): Promise<UserEntity> {
    try {
      const user = await UserModel.findById(id).populate("country").exec();
      console.log("user", user);
      if (!user) {
        throw CustomError.badRequest(`User with id ${id} not found.`);
      }
      return UserMapper.UserEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password, img, country, roles } = registerUserDto;

    try {
      const isUserExists = await UserModel.findOne({ email: email });
      if (isUserExists) throw CustomError.badRequest("User already exists.");

      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password),
        img: img,
        country: country,
        roles: roles,
      });

      await user.save();
      return UserMapper.UserEntityFromObject(user);
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
