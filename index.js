import express from 'express'
import connectdb from './config/db.js'
import { configDotenv } from 'dotenv'
   import { createClient} from 'redis'
configDotenv()
await connectdb()
const redisURL = process.env.Redis_URL

if (!redisURL) {
    console.log("missing redis url")
    process.exit(1)
}

export const RedisClient  =  createClient({
    url: redisURL
})
RedisClient.connect().then(console.log("redis connected")).catch(console.error)
const app = express() 
app.use(express.json())
const PORT = process.env.PORT || 6969
 import userRouter from './routers/userRouter.js'
 app.use("/api/v1",userRouter)
 
app.listen(PORT,()=>{
    console.log("server started on "+PORT)
})