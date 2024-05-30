import dotenv from "dotenv" ; 
import mongoose from "mongoose";

dotenv.config() ;

const connection = async(req , res) => {
    const MONGO_URL = process.env.MONGO_URL ; 

    await mongoose.connect(MONGO_URL , {}) ; 

    console.log("Connected to DB") ;
}

export default connection ; 