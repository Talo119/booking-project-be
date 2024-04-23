import { CountryEntity } from "../../entities/country.entity";
import { CountryRepository } from "../../repositories/country.repository";

export interface GetAllCountrysUseCase {
  execute(): Promise<CountryEntity[]>;
}

export class GetAllCountrys implements GetAllCountrysUseCase {
  constructor(private readonly repository: CountryRepository) {}

  execute(): Promise<CountryEntity[]> {
    return this.repository.getAll();
  }
}
