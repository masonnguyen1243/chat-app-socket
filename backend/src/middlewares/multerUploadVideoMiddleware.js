import multer from "multer";

import {
  LIMIT_COMMON_MEDIA_SIZE,
  ALLOW_COMMON_MEDIA_TYPES,
} from "../utils/Validators.js";

const customFileFilter = (req, file, callback) => {
  if (!ALLOW_COMMON_MEDIA_TYPES.includes(file.mimetype)) {
    const errMessage = "File type is invalid. Only accept mp4, webm and mov";
    return callback(errMessage, null);
  }

  return callback(null, true);
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: LIMIT_COMMON_MEDIA_SIZE },
  fileFilter: customFileFilter,
});

export const multerUploadVideoMiddleware = { upload };
