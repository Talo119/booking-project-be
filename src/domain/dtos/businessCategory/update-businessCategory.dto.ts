export class UpdateBusinessCategoryDto {
  constructor(
    public id: string,
    public name: string,
    public available: boolean
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.name) returnObj.name = this.name;
    if (this.available) returnObj.name = this.available;
    return returnObj;
  }

  static create(props: {
    [key: string]: any;
  }): [string?, UpdateBusinessCategoryDto?] {
    const { id, name, available } = props;

    return [undefined, new UpdateBusinessCategoryDto(id, name, available)];
  }
}
