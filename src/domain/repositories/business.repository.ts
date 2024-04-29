import { CreateBusinessDto } from "../dtos/business/create-business.dto";
import { BusinessEntity } from "../entities/business.entity";
import { UpdateBusinessDto } from "../dtos/business/update-bussines.dto";
export abstract class BusinessRepository {
  abstract create(
    createBusinessDto: CreateBusinessDto
  ): Promise<BusinessEntity>;
  abstract getAll(): Promise<BusinessEntity[]>;
  abstract getById(id: string): Promise<BusinessEntity>;
  abstract updateById(
    updateBusinessDto: UpdateBusinessDto
  ): Promise<BusinessEntity>;
  abstract deleteById(id: string): Promise<BusinessEntity>;
}
