import { Router } from "express";
import { WorkspaceDatasourceImpl, WorkspaceRepositoryImpl } from "../../infraestructure";
import { WorkspaceController } from "./controller";

export class WorkspacesRoutes{
    static get routes(): Router{
        const router = Router();

        const workspaceDatasource = new WorkspaceDatasourceImpl();
        const workspaceRepository = new WorkspaceRepositoryImpl(workspaceDatasource);
        const controller = new WorkspaceController(workspaceRepository);

        router.get('/', controller.getWorkspaces);
        router.post('/', controller.createWorkspace);
        router.get('/:id', controller.getWorkspaceById);
        router.put('/:id', controller.updateWorkspace);
        router.delete('/:id', controller.deleteWorkspace);

        return router;
    }
}