import { createClient } from "redis";

const client = createClient();

const main = async() => {
    await client.connect();
    while(1) {
        const response = await client.brPop("problems", 0);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("Processed user's submissions");
    }
}

main();
