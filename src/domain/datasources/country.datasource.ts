import { CreateCountryDto } from "../dtos/country/create-country.dto";
import { UpdateCountryDto } from "../dtos/country/update-country.dto";
import { CountryEntity } from "../entities/country.entity";

export abstract class CountryDataSource {
    abstract create(createCountryDto: CreateCountryDto): Promise<CountryEntity>;
    abstract getAll(): Promise<CountryEntity[]>;
    abstract getById(id:string): Promise<CountryEntity>;
    abstract updateById(updateCountryDto: UpdateCountryDto): Promise<CountryEntity>;
    abstract deleteById(id: string): Promise<CountryEntity>;
}