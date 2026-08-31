import "dotenv/config";
import express from "express";
import connectDB from "./Configs/ConnectDB.js";

const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
    res.json("Hello from server");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});