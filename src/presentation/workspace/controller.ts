import { Request, Response } from "express";
import {
  CreateWorkspaceDto,
  CustomError,
  UpdateWorkspaceDto,
  WorkspaceRepository,
} from "../../domain";

export class WorkspaceController {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  public getWorkspaces = async (req: Request, res: Response) => {
    try {
      const workspaces = await this.workspaceRepository.getAll();
      return res.json(workspaces);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };

  public getWorkspaceById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const workspace = await this.workspaceRepository.getById(id);
      return res.json(workspace);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };

  public createWorkspace = async (req: Request, res: Response) => {
    try {
      const [error, createWorkspaceDto] = CreateWorkspaceDto.create(req.body);
      if (error) return res.status(400).json({ error });
      if (!createWorkspaceDto) throw CustomError.badRequest("Bad request");
      const newWorkspace = await this.workspaceRepository.create(
        createWorkspaceDto
      );
      return res.json(newWorkspace);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };

  public updateWorkspace = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const [error, updateWorkspaceDto] = UpdateWorkspaceDto.create({
        ...req.body,
        id,
      });
      if (error) return res.status(400).json({ error });
      if (!updateWorkspaceDto) throw CustomError.badRequest("Bad request.");
      const updatedWorkspace = await this.workspaceRepository.updateById(
        updateWorkspaceDto
      );
      return res.json(updateWorkspaceDto);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };

  public deleteWorkspace = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const deletedWorkspace = await this.workspaceRepository.deleteById(id);
      return res.json(deletedWorkspace);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };
}
