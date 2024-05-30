import express from "express" ; 
import cors from "cors" ;
import mongoose from "mongoose";
import dotenv from "dotenv";
import connection from "./database/db.js";
import multer from "multer";

const app = express() ; 

dotenv.config() ;

app.use(express.json()) ;
app.use(cors()) ; 

app.listen(5000 , () => {
    console.log("Server is running on port 5000") ;
})

connection() ; 