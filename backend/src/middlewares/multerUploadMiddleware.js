import multer from "multer";

import {
  LIMIT_COMMON_FILE_SIZE,
  ALLOW_COMMON_FILE_TYPES,
} from "../utils/Validators.js";

const customFileFilter = (req, file, callback) => {
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.mimetype)) {
    const errMessage = "File type is invalid. Only accept jpg, jpeg and png";
    return callback(errMessage, null);
  }

  return callback(null, true);
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: LIMIT_COMMON_FILE_SIZE },
  fileFilter: customFileFilter,
});

export const multerUploadMiddleware = { upload };
