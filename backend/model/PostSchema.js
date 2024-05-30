import mongoose, { Schema, model } from "mongoose";

const postschema = new Schema({
    description : {
        type : String,
        required : true
    }, 
    image : {
        type : String,
        required : true 
    },
}) ;

const Post = model("Post" , postschema) ; 

export default Post ; 