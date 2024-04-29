export class UpdateBusinessDto {
  constructor(
    public id: string,
    public name: string,
    public direction: string,
    public mapUbication: string,
    public category: string,
    public user: string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.id) returnObj.id = this.id;
    if (this.name) returnObj.name = this.name;
    if (this.direction) returnObj.direction = this.direction;
    if (this.mapUbication) returnObj.mapUbication = this.mapUbication;
    if (this.category) returnObj.category = this.category;
    if (this.user) returnObj.user = this.user;
    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateBusinessDto?] {
    const { id, name, direction, mapUbication, category, user } = props;

    return [
      undefined,
      new UpdateBusinessDto(id, name, direction, mapUbication, category, user),
    ];
  }
}
