export class WorkspaceEntity {
    constructor(
        public id: string,
        public name: string,
        public available: boolean,
        public business: string,
    ) {
        
    }
}