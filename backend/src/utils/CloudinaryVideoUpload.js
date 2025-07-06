import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const streamUpload = (fileBuffer, folderName, resourceType = "auto") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderName, resource_type: resourceType },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export const CloudinaryMediaProvider = { streamUpload };
