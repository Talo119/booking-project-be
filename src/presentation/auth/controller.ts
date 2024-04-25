import { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  RegisterUser,
  RegisterUserDto,
} from "../../domain";

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

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
