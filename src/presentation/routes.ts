import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { CountryRoutes } from "./country/routes";
import { BusinessCategoryRoutes } from "./businessCategory/routes";
import { BusinessRoutes } from "./business/routes";


export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/country', CountryRoutes.routes);
        router.use('/api/businessCategory', BusinessCategoryRoutes.routes);
        router.use('/api/business', BusinessRoutes.routes);

        return router;
    }
}