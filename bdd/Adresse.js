class Adresse {
    constructor(street, city, state, zip_code) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip_code = zip_code;
    }

    get_string_adress() {
        return `${this.city} ${this.street} ${this.state} ${this.zip_code}`;
    }

    get_street() {
        return this.street;
    }

    get_city() {
        return this.city;
    }
    
    get_state() {
        return this.state;
    }
}