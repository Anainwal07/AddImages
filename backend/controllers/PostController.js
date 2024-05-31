import Post from "../model/PostSchema.js";

export const PostImage = async (req, res) => {

    const image = req.file.filename;
    const description = req.body.description; 
    
    try {
        const post = await Post.create({
            image,
            description, 
        });
        if (post) {
            console.log("Image Added successfully") ;
            res.status(200).json({ message: "Image added successfully" });
        } else {
            res.status(400).json({ message: "Image not added" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error in uploading file" });
    }
};

export const GetImages = async(req , res) => {
    try {
        const posts = await Post.find() ; 

        if(posts){
            res.status(200).json({message : "Images Fetched Successfully " , posts: posts}) ;
        }
        else{
            res.status(400).json({message : "Images not fetched" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error in fetching Posts" });
    }
}