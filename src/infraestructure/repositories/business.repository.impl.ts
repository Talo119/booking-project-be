import { BusinessDatasource, BusinessEntity, BusinessRepository, CreateBusinessDto, UpdateBusinessDto } from "../../domain";


export class BusinessRepositoryImpl implements BusinessRepository{
    constructor(
        private readonly businessDatasource: BusinessDatasource
    ) {
        
    }
    create(createBusinessDto: CreateBusinessDto): Promise<BusinessEntity> {
        return this.businessDatasource.create(createBusinessDto);
    }
    getAll(): Promise<BusinessEntity[]> {
        return this.businessDatasource.getAll();
    }
    getById(id: string): Promise<BusinessEntity> {
        return this.businessDatasource.getById(id);
    }
    updateById(updateBusinessDto: UpdateBusinessDto): Promise<BusinessEntity> {
        return this.businessDatasource.updateById(updateBusinessDto);
    }
    deleteById(id: string): Promise<BusinessEntity> {
        return this.businessDatasource.deleteById(id);
    }

}