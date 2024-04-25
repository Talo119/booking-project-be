import { Router } from "express";
import { CountryDataSourceImpl, CountryRepositoryImpl } from "../../infraestructure";
import { CountryController } from "./controller";

export class CountryRoutes{
    static get routes(): Router{
        const router = Router();

        const countryDatasource = new CountryDataSourceImpl();
        const countryRepository = new CountryRepositoryImpl(countryDatasource);
        const controller = new CountryController(countryRepository);

        router.get('/', controller.getCountrys);
        router.post('/', controller.createCountry);
        router.get('/:id', controller.getCountryById);
        router.put('/:id', controller.updateCountry);
        router.delete('/:id', controller.deleteCountry);

        return router;
    }
}