import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const PORT=process.env.PORT
const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).
then(()=>
{
    console.log("MongoDb is connected")
    app.listen(PORT,()=>console.log("Server is running"));
}).
catch((err)=>console.log("NONGODBERR",err))




