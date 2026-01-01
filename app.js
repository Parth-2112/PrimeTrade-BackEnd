//To use all the middlewares 
import express from "express";
import userRouter from "./routes/user.js"
import noteRouter from "./routes/note.js"
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";


export const app = express();
config({
  path: "./data/config.env",
});

//body data use krne k liye 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FONTEND_URL],
  methods:["GET", "PUT", "POST", "DELETE"],
  credentials:true,
}));

//Setting Routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/notes",noteRouter)

//Using Error Middleware
app.use(errorMiddleware);