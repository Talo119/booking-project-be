
export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public img: string,
        public country: string,
        public roles: string[],
    ) {
        
    }
}