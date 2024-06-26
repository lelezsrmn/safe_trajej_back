const express = require("express");
const Bdd_client = require("./Bdd_client");
const Bdd_danger = require("./Bdd_danger");
const cors = require('cors')

const app = express();
var allowedOrigins = [
    'http://localhost:3000',
    'http://safetrajej.com'
];

app.use(cors(({
    origin: function(origin, callback){
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
})))

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
        res.send(JSON.stringify(client));
    } catch (error) {
        res.status(500).send(error);
    } finally {
        //await bdd.close();
    }
});

app.get('/danger', async (req, res) => {
    try {
        console.log('starting danger')
        let bdd = new Bdd_danger();
        await bdd.connect();

        let positionStr = req.query.position;
        let position = positionStr.split(',').map(Number);
        let distance = parseFloat(req.query.distance);

        let ping_danger = await bdd.get_danger_from_position(position, distance);
        res.send(JSON.stringify(ping_danger));
     } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred while processing your request.");
    } finally {
        //await bdd.close();
    }
})


app.post('/danger', async (req, res) => {
    console.log('post danger')
    try {
        let bdd_danger = new Bdd_danger();
        await bdd_danger.connect();

        let danger_type = req.query.danger_type;
        let positionStr = req.query.position;
        let position = positionStr.split(',').map(Number);
        await bdd_danger.create_danger(danger_type, position);
    } catch (err) {
        console.error("An error occurred:", err);
        res.status(500).send("An error occurred while processing your request.");
    }
})

app.listen(3030, () => {
    console.log('Server listening on port 3030');
});
