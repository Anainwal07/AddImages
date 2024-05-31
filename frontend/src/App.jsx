// ImageUploadForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ost from './adfad/ost';

const ImageUploadForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('name', name);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Image uploaded successfully:', response.data);
      // Refetch images after upload
      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      // Add logic to handle error, e.g., display an error message
    }
  };

  // Fetch images from the server
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/images');
      console.log(response.data) ; 
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Fetch images upon component mount
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="image">Select Image:</label>
          <input type="file" id="image" onChange={(e) => setSelectedFile(e.target.files[0])} />
        </div>
        <button type="submit">Upload</button>
      </form>

      <h2>Uploaded Images</h2>
      {images.map((image) => (
        <div key={image._id}>
          {image.imageUrl && ( // Check if imageUrl is present
            <div>
              <img src="./images/img.jpg" alt={image.name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
              <p>{image.name}</p>
              <p>{image.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageUploadForm;
