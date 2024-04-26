import { BusinessCategoryDatasource, BusinessCategoryEntity, BusinessCategoryRepository, CreateBusinessCategoryDto, UpdateBusinessCategoryDto } from "../../domain";


export class BusinessCategoryRepositoryImpl implements BusinessCategoryRepository{
    constructor(
        private readonly businessCategoryDatasource: BusinessCategoryDatasource
    ) {
        
    }
    create(createBusinessCategoryDto: CreateBusinessCategoryDto): Promise<BusinessCategoryEntity> {
        return this.businessCategoryDatasource.create(createBusinessCategoryDto);
    }
    getAll(): Promise<BusinessCategoryEntity[]> {
        return this.businessCategoryDatasource.getAll();
    }
    getById(id: string): Promise<BusinessCategoryEntity> {
        return this.businessCategoryDatasource.getById(id);
    }
    updateById(updateBusinessCategoryDto: UpdateBusinessCategoryDto): Promise<BusinessCategoryEntity> {
        return this.businessCategoryDatasource.updateById(updateBusinessCategoryDto);
    }
    deleteById(id: string): Promise<BusinessCategoryEntity> {
        return this.businessCategoryDatasource.deleteById(id);
    }
    
}