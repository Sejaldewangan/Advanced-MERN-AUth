import express from 'express'
import connectdb from './config/db.js'
import { configDotenv } from 'dotenv'
   
configDotenv()

await connectdb()
const app = express() 
app.use(express.json())
const PORT = process.env.PORT || 6969
 import userRouter from './routers/userRouter.js'
 app.use("/api/v1",userRouter)
 
app.listen(PORT,()=>{
    console.log("server started on "+PORT)
})