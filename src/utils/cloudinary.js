// api_key missing error, so imported dotenv (explicitly)
import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // Upload file on cloudinary
    const resp = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // unlink localfilepath after upload file on cloudinary
    fs.unlinkSync(localFilePath);

    // console.log("File is uploaded on cloud", resp.url);
    return resp;
  } catch (error) {
    // Remove localy saved file as upload operation got failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
