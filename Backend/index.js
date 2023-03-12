import express from "express";
import userRoute from "./Routes/users.js";
import videoRoute from './Routes/videos.js'
import commentsROute from "./Routes/comments.js"
import authRoute from "./Routes/auth.js"
import { config } from "dotenv";
import { connect as _connect } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"

const app=express();
config()



const connect=()=>{
    _connect(process.env.MONGOOSE)
    .then(()=>{
        console.log('Connected To MongoDB');
    }).catch((err)=>{
        throw err;
    })
}

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/users", userRoute)
app.use("/api/video", videoRoute)
app.use("/api/comments", commentsROute)
app.use("/api/auth", authRoute)

app.use((err, req, res, next)=>{
    const status=err.status || 500
    const message=err.message|| "SomeThing went wrong!";

    return res.status(status).json({
        success:false,
        status,
        message
    })
})

app.listen(8800, ()=>{
    connect()
    console.log("App is running on 8800 successfully");

})