import { Request, Response } from "express";
import {
  BusinessCategoryRepository,
  CreateBusinessCategoryDto,
  CustomError,
  UpdateBusinessCategoryDto,
} from "../../domain";

export class BusinessCategoryController {
  constructor(
    private readonly businessCategoryRepository: BusinessCategoryRepository
  ) {}
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  public getbusinessCategories = async (req: Request, res: Response) => {
    try {
      const categories = await this.businessCategoryRepository.getAll();
      return res.json(categories);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };

  public getbusinessCategoryById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const category = await this.businessCategoryRepository.getById(id);
      return res.json(category);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };

  public createBusinessCategory = async (req: Request, res: Response) => {
    try {
      const [error, createBusinessCategoryDto] =
        CreateBusinessCategoryDto.create(req.body);
      if (error) return res.status(400).json({ error });
      if (!createBusinessCategoryDto)
        throw CustomError.badRequest("Bad request");

      const newBusinessCategory = await this.businessCategoryRepository.create(
        createBusinessCategoryDto
      );
      res.json(newBusinessCategory);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };

  public updateBusinessCategory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const [error, updateBusinessCategoryDto] =
        UpdateBusinessCategoryDto.create({
          ...req.body,
          id,
        });
      if (error) return res.status(400).json({ error });
      if (!updateBusinessCategoryDto)
        throw CustomError.badRequest("Bad request.");
      const updatedBusinesCategory =
        await this.businessCategoryRepository.updateById(
          updateBusinessCategoryDto
        );
      res.json(updatedBusinesCategory);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };

  public deleteBusinessCategory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const deletedCategory = await this.businessCategoryRepository.deleteById(
        id
      );
      res.json(deletedCategory);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };
}
