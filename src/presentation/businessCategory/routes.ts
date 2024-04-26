import { Router } from "express";
import { BusinessCategoryDatasourceImpl, BusinessCategoryRepositoryImpl } from "../../infraestructure";
import { BusinessCategoryController } from "./controller";

export class BusinessCategoryRoutes {
    static get routes(): Router{
        const router = Router();

        const businessCategoryDatasource = new BusinessCategoryDatasourceImpl();
        const businessCategoryRepository = new BusinessCategoryRepositoryImpl(businessCategoryDatasource);
        const controller = new BusinessCategoryController(businessCategoryRepository);

        router.get('/', controller.getbusinessCategories);
        router.post('/', controller.createBusinessCategory);
        router.get('/:id', controller.getbusinessCategoryById);
        router.put('/:id', controller.updateBusinessCategory);
        router.delete('/:id', controller.deleteBusinessCategory);

        return router;
    }
}