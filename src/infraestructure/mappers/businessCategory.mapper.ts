import { BusinessCategoryEntity, CustomError } from "../../domain";

export class BusinessCategoryMapper {
    static BusinessCategoryEntityFromObject(object: {[key:string]:any} | null ){
        if(!object) throw CustomError.badRequest('Updated is null.');

        const {id, _id, name, available} = object;

        if(!_id && !id) throw CustomError.badRequest('Missing id.');
        if(!name) throw CustomError.badRequest('Missing name.');

        return new BusinessCategoryEntity(id || _id, name, available);
    }
}