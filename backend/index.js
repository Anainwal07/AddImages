import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connection from './database/db.js';
import multer from 'multer';
import Image from './model/PostSchema.js';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Images will be stored in the uploads folder
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Keep the original name of the image file
    }
});

const upload = multer({storage : storage}) ;

// POST endpoint to upload an image
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageUrl = req.file.path;
    const uploadDate = new Date();

    const newImage = new Image({ name, description, imageUrl, uploadDate });
    await newImage.save();

    res.status(201).json(newImage);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image');
  }
});

// GET endpoint to fetch all images
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).send('Error fetching images');
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

connection();
