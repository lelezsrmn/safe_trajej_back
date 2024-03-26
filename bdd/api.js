const express = require("express");
const Bdd_client = require("./Bdd_client");
const Bdd_danger = require("./Bdd_danger");
const app = express();

app.get('/client', async (req, res) => {
    let bdd = new Bdd_client();
    await bdd.connect();
    try {
        let username = req.query.username;
        let client = await bdd.get_client_from_username(username);
        if (!client) {
            res.status(404).send("client not found");
            return;
        }
        console.log(username);
        res.send(JSON.stringify(client));
    } catch (error) {
        res.status(500).send(error);
    } finally {
        //await bdd.close();
    }
});

app.get('/danger', async (req, res) => {
    let bdd = new Bdd_danger();
    await bdd.connect();

        //try {
            let positionStr = req.query.position;
            let position = positionStr.split(',').map(Number);
            let distance = parseFloat(req.query.distance);
            let ping_danger = await bdd.get_danger_from_position(position, distance);
            res.send(JSON.stringify(ping_danger));/*
                    } catch (error) {
                        console.error("An error occurred:", error);
                        res.status(500).send("An error occurred while processing your request.");
                    } finally {
                        //await bdd.close();
                    }*/
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});