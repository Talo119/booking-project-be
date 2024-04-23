import { CountryModel } from "../../data/mongodb";
import {
  CountryDataSource,
  CountryEntity,
  CreateCountryDto,
  CustomError,
  UpdateCountryDto,
} from "../../domain";
import { CountryMapper } from "../mappers/country.mapper";

export class CountryDataSourceImpl implements CountryDataSource {
  async create(createCountryDto: CreateCountryDto): Promise<CountryEntity> {
    const { name, currency, area, locale } = createCountryDto;
    try {
      const isCountryExists = await CountryModel.findOne({ name: name });
      if (isCountryExists)
        throw CustomError.badRequest("Country already exists.");
      const country = await CountryModel.create({
        name: name,
        currency: currency,
        area: area,
        locale: locale,
      });

      await country.save();
      return CountryMapper.CountryEntityFromObject(country);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  getAll(): Promise<CountryEntity[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<CountryEntity> {
    throw new Error("Method not implemented.");
  }
  updateById(updateCountryDto: UpdateCountryDto): Promise<CountryEntity> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<CountryEntity> {
    throw new Error("Method not implemented.");
  }
}
