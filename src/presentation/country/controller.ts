import { Request, Response } from "express";
import {
  CountryRepository,
  CreateCountry,
  CreateCountryDto,
  DeleteCountry,
  GetAllCountrys,
  GetCountry,
  UpdateCountry,
  UpdateCountryDto,
} from "../../domain";
import { CustomError } from "../../domain/errors/custom.error";

export class CountryController {
  constructor(private readonly countryRepository: CountryRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  public getCountrys = (req: Request, res: Response) => {
    new GetAllCountrys(this.countryRepository)
      .execute()
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  public getCountryById = (req: Request, res: Response) => {
    new GetCountry(this.countryRepository)
      .execute(req.params.id)
      .then((country) => res.json(country))
      .catch((error) => this.handleError(error, res));
  };

  public createCountry = (req: Request, res: Response) => {
    const [error, createCountryDto] = CreateCountryDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateCountry(this.countryRepository)
      .execute(createCountryDto!)
      .then((country) => res.status(201).json(country))
      .catch((error) => this.handleError(error, res));
  };

  public updateCountry = (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateCountryDto] = UpdateCountryDto.create({
      ...req.body,
      id,
    });
    if (error) return res.status(400).json({ error });

    new UpdateCountry(this.countryRepository)
      .execute(updateCountryDto!)
      .then((country) => res.json(country))
      .catch((error) => this.handleError(error, res));
  };

  public deleteCountry = (req: Request, res: Response) => {
    const id = req.params.id;

    new DeleteCountry(this.countryRepository)
      .execute(id)
      .then((country) => res.json(country))
      .catch((error) => this.handleError(error, res));
  };
}
