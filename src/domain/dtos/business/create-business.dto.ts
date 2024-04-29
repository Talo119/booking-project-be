export class CreateBusinessDto {
  constructor(
    public name: string,
    public direction: string,
    public mapUbication: string,
    public category: string,
    public user: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateBusinessDto?] {
    const { name, direction, mapUbication, category, user } = object;
    if(!name) return ['Missing name.'];
    if(!direction) return ['Missing direction.'];
    if(!category) return ['Missing category.'];
    if(!user) return ['Missing user.'];
    return [
      undefined,
      new CreateBusinessDto(name, direction, mapUbication, category, user),
    ];
  }
}
