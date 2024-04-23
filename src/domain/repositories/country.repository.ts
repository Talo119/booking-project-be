import { CreateCountryDto } from '../dtos/country/create-country.dto';
import { CountryEntity } from '../entities/country.entity';
import { UpdateCountryDto } from '../dtos/country/update-country.dto';

export abstract class CountryRepository {
    abstract create(createCountryDto: CreateCountryDto): Promise<CountryEntity>;
    abstract getAll(): Promise<CountryEntity[]>;
    abstract getById(id:string): Promise<CountryEntity>;
    abstract updateById(updateCountryDto: UpdateCountryDto): Promise<CountryEntity>;
    abstract deleteById(id: string): Promise<CountryEntity>;
}