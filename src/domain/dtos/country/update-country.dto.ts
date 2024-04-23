export class UpdateCountryDto {
    constructor(
        public id: string,
        public name: string,
        public currency: string,
        public area: string,
        public locale: string
    ) {
        
    }

    get values(){
        const returnObj: {[key: string]:any} = {};
        if(this.name) returnObj.name = this.name;
        if(this.currency) returnObj.currency = this.currency;
        if(this.area) returnObj.area = this.area;
        if(this.locale) returnObj.locale = this.locale;
        return returnObj;
    }

    static create(props: {[key:string]:any}):[string?, UpdateCountryDto?]{
        const {id, name, currency, area, locale} = props;

        return[undefined, new UpdateCountryDto(id, name, currency, area, locale)]
    }
}