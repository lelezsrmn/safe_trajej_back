const { MongoClient } = require('mongodb');
const Danger = require("./Danger");

class Bdd_danger {
    constructor() {
        this.uri = "mongodb://localhost:27017/";
        this.danger = new MongoClient(this.uri);
    }

    async get_danger_from_position(position, distance) {
        try {
            let cursor = await this.collection.find({
                position: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: position
                        },
                        $maxDistance: distance
                    }
                }
            });

            if (!(await cursor.hasNext())) {
                throw new Error("Danger not found");
            }

            const documents = await cursor.toArray();
            return documents;
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }

    async connect() {
        await this.danger.connect();
        this.db = this.danger.db('safe_trajej');
        if (!this.db) {
            throw new Error("db not found");
        }
        this.collection = await this.db.collection("ping_danger");
        if (!this.collection) {
            throw new Error("collection ping_danger not found");
        }
        await this.collection.createIndex({ position: "2dsphere" });
    }

     async create_danger(danger_type, position) {
        const danger_to_put = new Danger(
            danger_type,
            position
        );
        await this.add_danger_to_bdd(danger_to_put);
        return danger_to_put;
    }

     async add_danger_to_bdd(danger) {
        const document = {
            danger_type: danger.get_danger_type(),
            position: danger.get_position()
        };
        const result = await this.collection.insertOne(document);
    }

     get_all_ping_danger_client(email) {
        return this.collection.find({ id_client: email });
    }

    async get_ping_by_street(street) {
        const query = { street: street };
        return this.collection.find(query);
    }

    async close() {
        await this.danger.close();
    }
}

module.exports = Bdd_danger;
