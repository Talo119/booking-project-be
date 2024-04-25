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
  async getAll(): Promise<CountryEntity[]> {
    try {
      const countrys = await CountryModel.find({});

      return countrys.map((country) =>
        CountryMapper.CountryEntityFromObject(country)
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async getById(id: string): Promise<CountryEntity> {
    try {
      const country = await CountryModel.findById(id).exec();

      if (!country)
        throw CustomError.badRequest(`Country with id ${id} not found.`);

      return CountryMapper.CountryEntityFromObject(country);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async updateById(updateCountryDto: UpdateCountryDto): Promise<CountryEntity> {
    try {
      const id = updateCountryDto.id;
      const country = await CountryModel.findById(id).exec();
      if (!country)
        throw CustomError.badRequest(`Country with id ${id} not found.`);

      const countryUpdated = await CountryModel.findByIdAndUpdate(id, updateCountryDto, {returnDocument: 'after'});
      console.log(typeof countryUpdated);
      // TODO: check was countryUpdated return, to create a correct mapper.
      return CountryMapper.CountryEntityFromObject(countryUpdated);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async deleteById(id: string): Promise<CountryEntity> {
    try {
      const country = await CountryModel.findById(id).exec();

      if (!country)
        throw CustomError.badRequest(`Country with id ${id} not found.`);

      const deletedCountry = await CountryModel.findByIdAndDelete(id);

      // TODO: check was deletedCountry return, to create a correct mapper.
      return CountryMapper.CountryEntityFromObject(country);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
