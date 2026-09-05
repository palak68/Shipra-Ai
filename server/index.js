import "dotenv/config";
import express from "express";
import connectDB from "./Configs/ConnectDB.js";
import cookieParser from "cookie-parser"
import authRouter from "./Routes/auth.route.js"
import userRouter from "./Routes/user.route.js"
import cors from "cors"

const app = express();


const privateCors =
  cors({

    origin: [
      "http://localhost:5173"
    ],

    credentials: true

  });

  
  const publicCors =
  cors({
    origin: "*",
  });

app.use(express.json())
app.use(cookieParser())


app.get("/", (req, res) => {
    res.json("Hello from server");
});


app.use("/api/auth",privateCors , authRouter)
app.use("/api/user",privateCors , userRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});