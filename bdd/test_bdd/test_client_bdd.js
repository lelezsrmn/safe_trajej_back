const Bdd_client = require('../Bdd_client');
const Client = require('../Client');

async function main() {
    const Bdd_client = require('../Bdd_client');
    const bdd_client = new Bdd_client();

        // Connect to the database
        await bdd_client.connect();

        // Create a sample client
        const sampleClient = new Client(
            "jejman",
            "jejman@gùmail.com",
            "jej",
            "man",
            "password123",
            ["adress1", "adress2", "adress3"],
            ["0225556665", "0782978599"]
        );
        console.log(sampleClient);

        // Add client to the database
        console.log('Adding client to the database:');
        await bdd_client.add_client_to_bdd(sampleClient);


        // Get client from the database
        console.log('Getting client from the database:');
        const retrievedClient = await bdd_client.get_client_from_username("jejman");
        console.log("================================================");
        console.log("bdd_client --  " + retrievedClient.get_username());


        // Close the database connection
        await bdd_client.close();
 }

// Run the main function
main();