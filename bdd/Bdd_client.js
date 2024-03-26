const { MongoClient } = require('mongodb');
const Client = require("./Client");
const bcrypt = require('bcrypt');
import emailValidator from 'email-validator';

class Bdd_client {
    constructor() {
        this.uri = "mongodb://localhost:27017/";
        this.client = new MongoClient(this.uri);
    }

    async connect() {
        await this.client.connect();
        this.db = this.client.db('safe_trajej');

        if (!this.db) {
            throw new Error("db not found");
        }
        this.collection = await this.db.collection("usr");
        if (!this.collection) {
            throw new Error("collection usr not found");
        }
    }

    async create_client(username, email, first_name, last_name, password, adresses, num) {
        if (!(await this.test_client_is_exist(email)) && this.isValidEmail(email)) {
            const salt_rounds = 10;
            const hashed_password = await bcrypt.hash(password, salt_rounds)
            const client = new Client(
                username,
                email,
                first_name,
                last_name,
                hashed_password,
                adresses,
                num
            );
            await this.add_client_to_bdd(client);
            return 201;
        }
        return 400;
    }

    isValidEmail(email) {
        return emailValidator.validate(email);
    }

    async authenticate_Client(username, password) {
        const client = await this.get_client_from_username(username);
        return await bcrypt.compare(password, client.password);
    }

    async add_client_to_bdd(client) {
        const document = {
            username: client.get_username(),
            email: client.get_email(),
            first_name: client.get_first_name(),
            last_name: client.get_last_name(),
            password: client.get_password(),
            adresses: client.get_adresses(),
            num: client.get_num()
        };
        const result = await this.collection.insertOne(document);
        client.set_id(result.insertedId);
        return result.insertedId;
    }

    async test_client_is_exist(email) {
        const is_exist = await this.collection.findOne({email: email});
        return is_exist;
    }

     async get_client_from_username(username) {

            const document = await this.collection.findOne({username: username});

            if (document) {
                return new Client(
                    document.username,
                    document.email,
                    document.first_name,
                    document.last_name,
                    document.password,
                    document.adresses,
                    document.num
                );
            }
            return null;
    }

    async update_client_bdd(client){
        const document = {
            username: client.get_username(),
            email: client.get_email(),
            first_name: client.get_first_name(),
            last_name: client.get_last_name(),
            password: client.get_password(),
            adresses: client.get_adresses(),
            num: client.get_num()
        }
        await this.collection.updateOne({username: client.get_username()}, {$set: document});
    }

    async delete_client_bdd(email){
        if (await this.test_client_is_exist(email)) {
            const ret = await this.collection.deleteOne({email: email});
            if (ret.deletedCount === 0) {
                throw new Error("Cannot delete");
            }
            return true;
        } else {
            console.error('Client not found');
            return false;
        }
    }

    async close() {
        await this.client.close();
    }
}

module.exports = Bdd_client;
