import express from "express"
import { createClient } from "redis"

const app = express();
app.use(express.json());

const client = createClient();

app.post("/submit", async(req, res)=> {
    const id = req.body.id;
    const code = req.body.code;
    const language = req.body.language;

    try {
        await client.lPush("problems", JSON.stringify({code, language, id}));
        res.status(200).send("Submission recieved and stored");
    } catch (error) {
        console.error("Redis error: ", error);
        res.status(500).send("Failed to store submissions");
    }
})

const startServer = async()=> {
    try {
        await client.connect();
        console.log("Connected to redis")

        app.listen(3000, () => {
            console.log("Server is running on PORT 3000")
        })
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startServer();
