const Bdd_client = require('../Bdd_client');
const Client = require('../Client');

async function main() {
    const Bdd_client = require('../Bdd_client');
    const bdd_client = new Bdd_client();

        // Connect to the database
        await bdd_client.connect();



        console.log(await bdd_client.create_client("jejman", "Meggie_Green3@yahoo.com", "prou", "prout", "blablalba", "prout", "prout"));


        // Close the database connection
        await bdd_client.close();
 }

// Run the main function
main();