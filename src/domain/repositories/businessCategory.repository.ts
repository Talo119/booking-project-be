import { CreateBusinessCategoryDto } from "../dtos/businessCategory/create-businessCategory.dto";
import { BusinessCategoryEntity } from "../entities/businessCategory.entity";
import { UpdateBusinessCategoryDto } from "../dtos/businessCategory/update-businessCategory.dto";

export abstract class BusinessCategoryRepository {
  abstract create(
    createBusinessCategoryDto: CreateBusinessCategoryDto
  ): Promise<BusinessCategoryEntity>;
  abstract getAll(): Promise<BusinessCategoryEntity[]>;
  abstract getAll(id: string): Promise<BusinessCategoryEntity>;
  abstract updateById(
    updateBusinessCategoryDto: UpdateBusinessCategoryDto
  ): Promise<BusinessCategoryEntity>;
  abstract deleteById(id: string): Promise<BusinessCategoryEntity>;
}
