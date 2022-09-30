//Importing dependencies
import express from "express";
import {} from "dotenv/config";

//Making Instances
const app = express();
const port = 3000;

//Routes
app.get('/', (req, res) => res.send('Hello World!'));

//Listening on port
app.listen(port, () => console.log(`Listening on port ${port}!`));
