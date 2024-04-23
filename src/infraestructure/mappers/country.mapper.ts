import { CountryEntity, CustomError } from "../../domain";

export class CountryMapper {
  static CountryEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, name, currency, area, locale } = object;

    if(!id || !_id){
        throw CustomError.badRequest('Missing id');
    }

    if(!name) throw CustomError.badRequest('Missing name');
    if(!currency) throw CustomError.badRequest('Missing currency');
    if(!area) throw CustomError.badRequest('Missing area');
    if(!locale) throw CustomError.badRequest('Missing locale');

    return new CountryEntity(id || _id, name, currency, area, locale);
  }
}
