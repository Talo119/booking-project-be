import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infraestructure';


export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const authDatasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(authDatasource);
        const controller = new AuthController(authRepository);

        router.get('/', controller.getUsers);
        router.get('/:id', controller.getUserById);
        router.post('/register', controller.registerUser);
        router.post('/login', controller.login);

        return router;
    }
}