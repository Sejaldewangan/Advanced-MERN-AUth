import mongoose from "mongoose";
import { configDotenv } from 'dotenv'
   
configDotenv()

const URI = process.env.MONGO_URI ;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {

    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
