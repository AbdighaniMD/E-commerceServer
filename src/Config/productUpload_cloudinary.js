import cloudinaryPackage from "cloudinary";
import dotenv from 'dotenv';
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();
//configure cloudinary
const cloudinary = cloudinaryPackage.v2;
cloudinary.config({
  cloud_name: process.env.cloudinary_CLOUD_NAME,
  api_key: process.env.cloudinary_API_KEY,
  api_secret: process.env.cloudinary_API_SECRET_KEY,
});

//Instance of cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: "Node-Ecommerces-API",
  },
});

// Init Multer with the storage engine
const upload = multer({ storage: storage });
export default upload;