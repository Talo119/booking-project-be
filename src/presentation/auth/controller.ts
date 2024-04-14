import { Request, Response } from "express";


export class AuthController {


    getUsers = (req: Request, res: Response) => {
        res.json('Get users');
    }

    registerUser = (req: Request, res: Response) => {
        res.json('Register user.');
    }

}