import { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  RegisterUser,
  RegisterUserDto,
} from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { JwtAdapter } from "../../config/jwt";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  public getUsers = async (req: Request, res: Response) => {
    const users = await this.authRepository.getAllUsers();
    return res.json(users);
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await this.authRepository.getUserById(id);
      res.json(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };

  public login = async (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    try {
      if (!loginUserDto) return res.status(400).json({ error: "Bad request." });
      if (error) return res.status(400).json({ error });

      const user = await this.authRepository.login(loginUserDto);

      const token = await JwtAdapter.generateToken(
        { id: user.id, email: user.email, name: user.name },
        "2h"
      );

      if (!token) throw CustomError.internalServer("Error generating token.");

      res.json({
        ok: true,
        id: user.id,
        email: user.email,
        name: user.name,
        token,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
