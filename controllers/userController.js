import express from 'express'
import tryCatch from '../middleware/tryCatch.js'
import sanitize from "mongo-sanitize";
import { registerSchema } from '../config/zod.js';
const registerUser = tryCatch(async (req,res) => {
    const sanitizedBody = sanitize(req.body)

const validation = registerSchema.safeParse(sanitizedBody)
 if (!validation.success){
    res.status(400).json("validation error")
 } 

  const {name,email,password} = validation.data
  res.json({name ,email,password})
})

export {registerUser}