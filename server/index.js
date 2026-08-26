import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();



const PORT = 8000;

app.get ("/", (req, res) => {
    res.json("Hello from server");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});