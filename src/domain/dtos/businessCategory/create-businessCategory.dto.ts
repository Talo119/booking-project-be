export class CreateBusinessCategoryDto {
  constructor(public name: string, public available: boolean) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateBusinessCategoryDto?] {
    const { name, available } = object;

    if(!name) return ['Missing name.'];

    return [
        undefined,
        new CreateBusinessCategoryDto(name, available)
    ];
  }
}
