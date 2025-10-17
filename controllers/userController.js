import tryCatch from "../middleware/tryCatch.js";
import sanitize from "mongo-sanitize";
import { registerSchema } from "../config/zod.js";
import { RedisClient } from "../index.js";
import { User } from "../models/userSchema.js";
import bycrpt from "bycrpt"
import crypto from 'crypto'
import sendMail from "../config/sendmail.js";

export const registerUser = tryCatch(async (req, res) => {
  const sanitizedBody = sanitize(req.body);

  const validation = registerSchema.safeParse(sanitizedBody);
  if (!validation.success) {
    const zodError = validation.error;
    let firstErrorMessage = "Validation failed";
    let allErrors = [];

    if (zodError?.issues && Array.isArray(zodError.issues)) {
      allErrors = zodError.issues.map((issue) => ({
        field: issue.path ? issue.path.join(".") : "unknown",
        message: issue.message || "Validation error",
        code: issue.code,
      }));
    }

    firstErrorMessage = allErrors[0]?.message || "Validation error";
    return res.status(400).json({ message: firstErrorMessage, errors: allErrors });
  }

  const { name, email, password } = validation.data;

const rateLimitKey= `register rate limit ${req.ip}: ${email}`

if ( await RedisClient.get(rateLimitKey)){
  res.status(429).json({
    message:"too many request , try again later"

  })
} 

const exsistingUser= await User.findOne({email})


if(exsistingUser){
  res.status(400).json({
    message:"user already exsists"
  })
}

const hassedPassword = bycrpt.hash(password,10)

const verifytoken=crypto.randomBytes(32).toString('hex')
const verifyKey = `verify:${verifytoken}`

const dataTOstore = JSON.stringify({
  name,email,password:hassedPassword  
})

await RedisClient.set(verifyKey,dataTOstore,{EX: 300})

 const subject="verify your email for account creation"
 const html =``

await sendMail({email,subject,html})

await

  return res.status(200).json({ name, email, password });
});
