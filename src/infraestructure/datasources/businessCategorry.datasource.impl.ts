import { BusinessCategoryModel } from "../../data/mongodb/models/businessCategory";
import {
  BusinessCategoryDatasource,
  BusinessCategoryEntity,
  CreateBusinessCategoryDto,
  UpdateBusinessCategoryDto,
} from "../../domain";
import { CustomError } from "../../domain/errors/custom.error";
import { BusinessCategoryMapper } from "../mappers/businessCategory.mapper";

export class BusinessCategoryDatasourceImpl
  implements BusinessCategoryDatasource
{
  async create(
    createBusinessCategoryDto: CreateBusinessCategoryDto
  ): Promise<BusinessCategoryEntity> {
    const { name, available } = createBusinessCategoryDto;
    try {
      const isCategoryExists = await BusinessCategoryModel.findOne({
        name: name,
      });
      if (isCategoryExists)
        throw CustomError.badRequest(`Category ${name} already exists.`);
      const category = await BusinessCategoryModel.create({
        name: name,
        available: available,
      });
      await category.save();
      return BusinessCategoryMapper.BusinessCategoryEntityFromObject(category);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async getAll(): Promise<BusinessCategoryEntity[]> {
    try {
      const categories = await BusinessCategoryModel.find({});
      return categories.map((category) =>
        BusinessCategoryMapper.BusinessCategoryEntityFromObject(category)
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getById(id: string): Promise<BusinessCategoryEntity> {
    try {
      const category = await BusinessCategoryModel.findById(id).exec();
      if (!category)
        throw CustomError.badRequest(`Category with id ${id} not found.`);
      return BusinessCategoryMapper.BusinessCategoryEntityFromObject(category);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async updateById(
    updateBusinessCategoryDto: UpdateBusinessCategoryDto
  ): Promise<BusinessCategoryEntity> {
    try {
      const id = updateBusinessCategoryDto.id;
      const category = await BusinessCategoryModel.findById(id).exec();
      if (!category)
        throw CustomError.badRequest(`Category with id ${id} not found.`);

      const categoryUpdated = await BusinessCategoryModel.findByIdAndUpdate(
        id,
        updateBusinessCategoryDto,
        { returnDocument: "after" }
      );
      return BusinessCategoryMapper.BusinessCategoryEntityFromObject(
        categoryUpdated
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async deleteById(id: string): Promise<BusinessCategoryEntity> {
    try {
      const category = await BusinessCategoryModel.findById(id).exec();
      if (!category)
        throw CustomError.badRequest(`Category with id ${id} not found.`);

      const deletedCategory = await BusinessCategoryModel.findByIdAndDelete(id);
      return BusinessCategoryMapper.BusinessCategoryEntityFromObject(
        deletedCategory
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
