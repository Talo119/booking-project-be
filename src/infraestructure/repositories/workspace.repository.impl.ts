import {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  WorkspaceDatasource,
  WorkspaceEntity,
  WorkspaceRepository,
} from "../../domain";

export class WorkspaceRepositoryImpl implements WorkspaceRepository {
  constructor(private readonly workspaceDatasource: WorkspaceDatasource) {}
  create(createWorkspaceDto: CreateWorkspaceDto): Promise<WorkspaceEntity> {
    return this.workspaceDatasource.create(createWorkspaceDto);
  }
  getAll(): Promise<WorkspaceEntity[]> {
    return this.workspaceDatasource.getAll();
  }
  getById(id: string): Promise<WorkspaceEntity> {
    return this.workspaceDatasource.getById(id);
  }
  updateById(updateWorkspaceDto: UpdateWorkspaceDto): Promise<WorkspaceEntity> {
    return this.workspaceDatasource.updateById(updateWorkspaceDto);
  }
  deleteById(id: string): Promise<WorkspaceEntity> {
    return this.workspaceDatasource.deleteById(id);
  }
}
