import {
  CountryDataSource,
  CountryEntity,
  CountryRepository,
  CreateCountryDto,
  UpdateCountryDto,
} from "../../domain";

export class CountryRepositoryImpl implements CountryRepository {
  constructor(private readonly countryDatasource: CountryDataSource) {}
  create(createCountryDto: CreateCountryDto): Promise<CountryEntity> {
    return this.countryDatasource.create(createCountryDto);
  }
  getAll(): Promise<CountryEntity[]> {
    return this.countryDatasource.getAll();
  }
  getById(id: string): Promise<CountryEntity> {
    return this.countryDatasource.getById(id);
  }
  updateById(updateCountryDto: UpdateCountryDto): Promise<CountryEntity> {
    return this.countryDatasource.updateById(updateCountryDto);
  }
  deleteById(id: string): Promise<CountryEntity> {
    return this.countryDatasource.deleteById(id);
  }
}
