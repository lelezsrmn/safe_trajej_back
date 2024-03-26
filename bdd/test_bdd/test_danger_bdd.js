const Danger_bdd = require('../Bdd_danger')
const Danger = require('../Danger');
const Danger_type = Danger.DangerType;


async function main() {
    const bdd_danger = new Danger_bdd();
        try {
            await bdd_danger.connect();

            //await bdd_danger.create_danger(Danger_type.Agression, [48.856614, 2.294481]);
            //await bdd_danger.create_danger(Danger_type.Agression, [55.123456, -1.987654]);
            await bdd_danger.create_danger(Danger_type.Agression, [51.989654, 0.466789]);
            /*await bdd_danger.create_danger(Danger_type.Agression, [53.987654, -0.365478]);
            await bdd_danger.create_danger(Danger_type.Agression, [57.456789, -3.102365]);
            await bdd_danger.create_danger(Danger_type.Agression, [50.123456, -5.365478]);
            await bdd_danger.create_danger(Danger_type.Agression, [54.789012, -2.854123]);
            await bdd_danger.create_danger(Danger_type.Agression, [59.123456, -7.365478]);
            await bdd_danger.create_danger(Danger_type.Agression, [52.987654, 1.456789]);
            await bdd_danger.create_danger(Danger_type.Agression, [56.789012, -4.102365]);
            await bdd_danger.create_danger(Danger_type.Agression, [49.892345, -6.725369]);*/

            console.log("================================================");

            let ping_dangers = await bdd_danger.get_danger_from_position([48.856614, 2.294481], 10000);
            console.log(JSON.stringify(ping_dangers));
        }
        finally {
            await bdd_danger.close();
        }
}

main();