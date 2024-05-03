import { WorkspaceModel } from "../../data/mongodb";
import {
  CreateWorkspaceDto,
  CustomError,
  UpdateWorkspaceDto,
  WorkspaceDatasource,
  WorkspaceEntity,
} from "../../domain";
import { WorkspaceMapper } from "../mappers/workspace.mapper";

export class WorkspaceDatasourceImpl implements WorkspaceDatasource {
  async create(
    createWorkspaceDto: CreateWorkspaceDto
  ): Promise<WorkspaceEntity> {
    try {
      const { name, available, business } = createWorkspaceDto;
      const isWorkspaceExists = await WorkspaceModel.findOne({ name: name });
      if (isWorkspaceExists)
        throw CustomError.badRequest(`Workspace ${name} already exists.`);

      const workspace = await WorkspaceModel.create({
        name: name,
        available: available,
        business: business,
      });
      await workspace.save();
      return WorkspaceMapper.WorkspaceEntityFromObject(workspace);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async getAll(): Promise<WorkspaceEntity[]> {
    try {
      const workspaces = await WorkspaceModel.find().populate("business");
      return workspaces.map((ws) =>
        WorkspaceMapper.WorkspaceEntityFromObject(ws)
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async getById(id: string): Promise<WorkspaceEntity> {
    try {
      const workspace = await WorkspaceModel.findById(id)
        .populate("business")
        .exec();
      if (!workspace)
        throw CustomError.badRequest(`Workspace with id ${id} not found.`);

      return WorkspaceMapper.WorkspaceEntityFromObject(workspace);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async updateById(
    updateWorkspaceDto: UpdateWorkspaceDto
  ): Promise<WorkspaceEntity> {
    try {
      const id = updateWorkspaceDto.id;
      const workspace = await WorkspaceModel.findById(id)
        .populate("business")
        .exec();
      if (!workspace)
        throw CustomError.badRequest(`Workspace with id ${id} not found.`);

      const workspaceUpdated = await WorkspaceModel.findByIdAndUpdate(
        id,
        updateWorkspaceDto,
        { returnDocument: "after" }
      );
      return WorkspaceMapper.WorkspaceEntityFromObject(workspaceUpdated);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async deleteById(id: string): Promise<WorkspaceEntity> {
    try {
      const workspace = await WorkspaceModel.findById(id)
        .populate("business")
        .exec();
      if (!workspace)
        throw CustomError.badRequest(`Workspace with id ${id} not found.`);

      const workspaceDeleted = await WorkspaceModel.findByIdAndUpdate(id);
      return WorkspaceMapper.WorkspaceEntityFromObject(workspaceDeleted);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
