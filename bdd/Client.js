const { MongoClient } = require('mongodb');

class Client {

    constructor(username, email, first_name, last_name, password, adresses, num) {

        this.id = null;
        this.username = username;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.adresses = adresses;
        this.num = num;
    }



    async get_id() {
        try {
            const client = new MongoClient('mongodb://localhost:27017');
            const db = client.db('safe_trajej_usr');
            const collection = db.collection('usr');

            const client_id = await collection.findOne({ email: this.get_email()});
            if (client_id) {
                return client_id._id;
            }
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        } finally {
            await this.close();
        }
    }
    get_username() {
        return this.username;
    }
    get_email() {
        return this.email;
    }
    get_first_name() {
        return this.first_name;
    }
    get_last_name() {
        return this.last_name;
    }
    get_password() {
        return this.password;
    }
    get_adresses() {
        return this.adresses;
    }
    get_num() {
        return this.num;
    }

    set_username(username) {
        this.username = username;
    }

    set_email(email) {
        this.email = email;
    }
    is_valid_email(email) {
        // Expression régulière pour un email valide
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Retourne true si l'email correspond à la regex, false sinon
        return regex.test(email);
    }

    set_id(id) {
        this.id = id;
    }
}

module.exports = Client;