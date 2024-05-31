import express from "express" ; 
import { GetImages } from "../controllers/PostController.js";

const router = express.Router() ; 

router.get("/get-images" , GetImages);

export default router ;