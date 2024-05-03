import { CustomError, WorkspaceEntity } from "../../domain";

export class WorkspaceMapper {
    static WorkspaceEntityFromObject(object: {[key:string]: any} | null){
        if(!object) throw CustomError.badRequest('Object is null.');

        const {id, _id, name, available, business} = object;

        if (!id && !id) throw CustomError.badRequest("Missing id.");
        if (!name) throw CustomError.badRequest("Missing name.");
        if (!business) throw CustomError.badRequest("Missing business.");
        return new WorkspaceEntity(
            id || _id, name, available, business
        );
    }
}