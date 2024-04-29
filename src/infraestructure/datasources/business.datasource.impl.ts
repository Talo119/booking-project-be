import { BusinessModel } from "../../data/mongodb";
import {
  BusinessDatasource,
  BusinessEntity,
  CreateBusinessDto,
  CustomError,
  UpdateBusinessDto,
} from "../../domain";
import { BusinessMapper } from "../mappers/business.mapper";

export class BusinessDatasourceImpl implements BusinessDatasource {
  async create(createBusinessDto: CreateBusinessDto): Promise<BusinessEntity> {
    try {
      const { name, direction, mapUbication, category, user } =
        createBusinessDto;
      const isBusinessExitst = await BusinessModel.findOne({ name: name });
      if (isBusinessExitst)
        throw CustomError.badRequest(`Business ${name} already exists.`);

      const business = await BusinessModel.create({
        name: name,
        direction: direction,
        mapUbication: mapUbication,
        category: category,
        user: user,
      });
      await business.save();
      return BusinessMapper.BusinessEntityFromObject(business);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async getAll(): Promise<BusinessEntity[]> {
    try {
      const business = await BusinessModel.find()
        .populate("user")
        .populate("category");
      return business.map((bu) => BusinessMapper.BusinessEntityFromObject(bu));
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async getById(id: string): Promise<BusinessEntity> {
    try {
      const business = await BusinessModel.findById(id)
        .populate("user")
        .populate("category")
        .exec();

      if (!business)
        throw CustomError.badRequest(`Business with id ${id} not found.`);
      return BusinessMapper.BusinessEntityFromObject(business);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async updateById(
    updateBusinessDto: UpdateBusinessDto
  ): Promise<BusinessEntity> {
    try {
      const id = updateBusinessDto.id;
      const business = await BusinessModel.findById(id).exec();
      if (!business)
        throw CustomError.badRequest(`Business with id ${id} not found.`);

      const businessUpdated = await BusinessModel.findByIdAndUpdate(
        id,
        updateBusinessDto,
        { returnDocument: "after" }
      );
      return BusinessMapper.BusinessEntityFromObject(businessUpdated);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async deleteById(id: string): Promise<BusinessEntity> {
    try {
      const business = await BusinessModel.findById(id).exec();
      if (!business)
        throw CustomError.badRequest(`Business with id ${id} not found.`);

      const businessCategory = await BusinessModel.findByIdAndDelete(id);
      return BusinessMapper.BusinessEntityFromObject(businessCategory);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
