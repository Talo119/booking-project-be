
import { CountryEntity } from "../../entities/country.entity";
import { CountryRepository } from "../../repositories/country.repository";
import { UpdateCountryDto } from '../../dtos/country/update-country.dto';

export interface UpdateCountryUseCase{
    execute(updateCountryDto: UpdateCountryDto): Promise<CountryEntity>
}

export class UpdateCountry implements UpdateCountryUseCase {
    constructor(
        private readonly repository: CountryRepository
    ) {
        
    }
    execute(updateCountryDto: UpdateCountryDto): Promise<CountryEntity> {
        return this.repository.updateById(updateCountryDto);
    }
}