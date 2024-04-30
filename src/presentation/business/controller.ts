import { Request, Response } from "express";
import {
  BusinessRepository,
  CreateBusinessDto,
  CustomError,
  UpdateBusinessDto,
} from "../../domain";

export class BusinessController {
  constructor(private readonly businessRepository: BusinessRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  public getBusiness = async (req: Request, res: Response) => {
    try {
      const business = await this.businessRepository.getAll();
      return res.json(business);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };
  public getBusinessById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const business = await this.businessRepository.getById(id);
      return res.json(business);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };
  public createBusiness = async (req: Request, res: Response) => {
    try {
      const [error, createBusinessDto] = CreateBusinessDto.create(req.body);
      if (error) return res.status(400).json({ error });
      if (!createBusinessDto) throw CustomError.badRequest("Bad request");
      const newBusiness = await this.businessRepository.create(
        createBusinessDto
      );
      return res.json(newBusiness);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };
  public updateBusiness = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const [error, updateBusinessDto] = UpdateBusinessDto.create({
        ...req.body,
        id,
      });
      if (error) return res.status(400).json({ error });
      if (!updateBusinessDto) throw CustomError.badRequest("Bad request");
      const updatedBusiness = await this.businessRepository.updateById(
        updateBusinessDto
      );
      res.json(updatedBusiness);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };
  public deleteBusiness = async (req: Request, res: Response) =>{
    try {
        const id = req.params.id;
        const deletedBusiness = await this.businessRepository.deleteById(id);
        return res.json(deletedBusiness);
    } catch (error) {
        if (error instanceof CustomError) {
            throw error;
          }
          throw CustomError.internalServer();
    }
  }
}
