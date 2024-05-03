export class UpdateWorkspaceDto {
  constructor(
    public id: string,
    public name: string,
    public available: boolean,
    public business: string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.id) returnObj.id = this.id;
    if (this.name) returnObj.name = this.name;
    if (this.available) returnObj.available = this.available;
    if (this.business) returnObj.business = this.business;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateWorkspaceDto?] {
    const { id, name, available, business } = props;

    return [undefined, new UpdateWorkspaceDto(id, name, available, business)];
  }
}
