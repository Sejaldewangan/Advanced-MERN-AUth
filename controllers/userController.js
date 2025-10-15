import express from 'express'
import tryCatch from '../middleware/tryCatch.js'
import sanitize from "mongo-sanitize";
const registerUser = tryCatch(async (req,res) => {
   sanitize (req.body) = {name,email,password}
 res.json({name,email,password})

})

export {registerUser}