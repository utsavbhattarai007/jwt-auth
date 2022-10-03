//Importing dependencies
import express from "express";
import {} from "dotenv/config";
import colors from "colors";
import {connectDB} from "./conn.js";
import authRoutes from "./routes/_auth.js";
import refreshTokenRoutes from "./routes/_refreshToken.js";
import userRoutes from "./routes/_users.js";

//Making Instances
const app = express();
const port = process.env.PORT || 3000;

//Connecting to Database
connectDB();

//middlewares
app.use(express.json());

//Routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use("/api",authRoutes);
app.use("/api/refresh",refreshTokenRoutes);
app.use("/api/users",userRoutes);

//Listening on port
app.listen(port, () => console.log(`Listening on port ${port}!`.brightWhite));
