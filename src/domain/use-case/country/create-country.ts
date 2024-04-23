import { CreateCountryDto } from "../../dtos/country/create-country.dto";
import { CountryEntity } from "../../entities/country.entity";
import { CountryRepository } from "../../repositories/country.repository";

export interface CreateCountryUseCase{
    execute(createCounryDto: CreateCountryDto): Promise<CountryEntity>
}

export class CreateCountry implements CreateCountryUseCase {
    constructor(
        private readonly repository: CountryRepository
    ) {
        
    }
    execute(createCounryDto: CreateCountryDto): Promise<CountryEntity> {
        return this.repository.create(createCounryDto);
    }
}