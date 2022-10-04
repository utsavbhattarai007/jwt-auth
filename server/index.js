//Importing dependencies
import express from "express";
import {} from "dotenv/config";
import colors from "colors";
import {connectDB} from "./conn.js";
import authRoutes from "./routes/_auth.js";
import refreshTokenRoutes from "./routes/_refreshToken.js";
import userRoutes from "./routes/_users.js";
import imgRoute from "./routes/_userPic.js"
import cors from "cors"

//Making Instances
const app = express();
const port = process.env.PORT || 3000;

//Connecting to Database
connectDB();

//middlewares
app.use(express.json());
app.use(cors("*"))

//Routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use("/api",authRoutes);
app.use("/api/refresh",refreshTokenRoutes);
app.use("/api/users",userRoutes);

//Img upload
app.use("/api/upload",imgRoute)
app.use("/uploads", express.static("uploads"));

//Listening on port
app.listen(port, () => console.log(`Listening on port ${port}!`.brightWhite));
