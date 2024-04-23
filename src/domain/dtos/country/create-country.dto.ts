export class CreateCountryDto {
  constructor(
    public name: string,
    public currency: string,
    public area: string,
    public locale: string
  ) {}

  static create(object: {[key: string]: any}): [string?, CreateCountryDto?]{
    const {name, currency, area,locale} = object;

    if(!name) return ['Missing name'];
    if(!currency) return ['Missing currency'];

    return [
        undefined,
        new CreateCountryDto(name, currency, area,locale),
    ]
  }
}
