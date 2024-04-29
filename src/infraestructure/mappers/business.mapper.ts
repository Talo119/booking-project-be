import { BusinessEntity, CustomError } from "../../domain";

export class BusinessMapper {
  static BusinessEntityFromObject(object: { [key: string]: any } | null) {
    if (!object) throw CustomError.badRequest("Updated is null.");

    const { id, _id, name, direction, mapUbication, category, user } = object;

    if (!id && !id) throw CustomError.badRequest("Missing id.");
    if (!name) throw CustomError.badRequest("Missing name.");

    return new BusinessEntity(
      id || _id,
      name,
      direction,
      mapUbication,
      category,
      user
    );
  }
}
