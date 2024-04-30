import { Router } from "express";
import { BusinessDatasourceImpl, BusinessRepositoryImpl } from "../../infraestructure";
import { BusinessController } from "./controller";

export class BusinessRoutes{
    static get routes(): Router{
        const router = Router();

        const businessDatasource = new BusinessDatasourceImpl();
        const businessRepository = new BusinessRepositoryImpl(businessDatasource);
        const controller = new BusinessController(businessRepository);

        router.get('/', controller.getBusiness);
        router.post('/', controller.createBusiness);
        router.get('/:id', controller.getBusinessById);
        router.put('/:id', controller.updateBusiness);
        router.delete('/:id', controller.deleteBusiness);


        return router;
    }
}