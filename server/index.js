//Importing dependencies
import express from "express";
import {} from "dotenv/config";
import colors from "colors";
import {connectDB} from "./conn.js";

//Making Instances
const app = express();
const port = 3000;

//Connecting to Database
connectDB();

//Routes
app.get('/', (req, res) => res.send('Hello World!'));

//Listening on port
app.listen(port, () => console.log(`Listening on port ${port}!`.brightWhite));
