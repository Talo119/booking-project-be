export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
    public img: string,
    public country: string,
    public roles: string[]
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password, img, country, roles } = object;

    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!password) return ["Missing password"];
    if (!roles) return ["Missing roles"];

    return [
      undefined,
      new RegisterUserDto(name, email, password, img, country, roles),
    ];
  }
}
