import express from 'express'
import connectdb from './config/db.js'
import { configDotenv } from 'dotenv'
   
configDotenv()

await connectdb()
const app = express() 

const PORT = process.env.PORT || 6969

app.listen(PORT,()=>{
    console.log("server started on "+PORT)
})