export class CreateWorkspaceDto {
  constructor(
    public name: string,
    public available: string,
    public business: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateWorkspaceDto?] {
    const { name, available, business } = object;

    if (!name) return ["Missing name."];
    if (!business) return ["Missing business."];
    return [undefined, new CreateWorkspaceDto(name, available, business)];
  }
}
