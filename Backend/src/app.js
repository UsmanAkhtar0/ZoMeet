import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";
import dotenv from "dotenv";

dotenv.config();


const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);


app.get("/home", (req, res) => {
    return res.json({ "hello": "World" });
});

const start = async () => {
    app.set("mongo_user");
    const connectionDb = await mongoose.connect(process.env.ATLASDB_URL || "mongodb+srv://Usman:706843@cluster0.kvcr5.mongodb.net/");
    console.log(`Connected to datbase: ${connectionDb.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log("LISTENING ON PORT 8000")
    });
}

start();