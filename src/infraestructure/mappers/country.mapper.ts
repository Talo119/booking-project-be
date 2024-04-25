import { CountryEntity, CustomError } from "../../domain";

export class CountryMapper {
  static CountryEntityFromObject(object: { [key: string]: any } | null) {
    if (!object) {
      throw CustomError.badRequest('Updated is null');
    }
    const { id, _id, name, currency, area, locale } = object;
    
    if( !_id && !id){
        throw CustomError.badRequest('Missing id');
    }

    if(!name) throw CustomError.badRequest('Missing name');
    if(!currency) throw CustomError.badRequest('Missing currency');
    if(!area) throw CustomError.badRequest('Missing area');
    if(!locale) throw CustomError.badRequest('Missing locale');

    return new CountryEntity(id || _id, name, currency, area, locale);
  }
}
