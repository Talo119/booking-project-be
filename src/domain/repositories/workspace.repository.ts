import { CreateWorkspaceDto } from "../dtos/workspace/create-workspace.dto";
import { WorkspaceEntity } from "../entities/workspace.entity";
import { UpdateWorkspaceDto } from "../dtos/workspace/update-workspace.dto";

export abstract class WorkspaceRepository {
  abstract create(
    createWorkspaceDto: CreateWorkspaceDto
  ): Promise<WorkspaceEntity>;
  abstract getAll(): Promise<WorkspaceEntity[]>;
  abstract getById(id: string): Promise<WorkspaceEntity>;
  abstract updateById(
    updateWorkspaceDto: UpdateWorkspaceDto
  ): Promise<WorkspaceEntity>;
  abstract deleteById(id: string): Promise<WorkspaceEntity>;
}
