import { Schema , model} from "mongoose";

const imageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const Image = model('Image', imageSchema);

export default Image ; 
