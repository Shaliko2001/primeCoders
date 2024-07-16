// NPM modules
import { v4 as uuidv4 } from 'uuid';

import multer from 'multer';
import { extname } from 'path';
import fs from 'fs';

// Local modules
import variablesConfig from '../config/variables.config';
import { ErrorsUtil } from '../utils';

const { InputValidationError } = ErrorsUtil;

export class ImageUploadMiddleware {
  static upload() {
    try {
      const path = `${variablesConfig.UPLOAD_IMAGES}`;
      const storage = multer.diskStorage({
        // uploading directory
        destination(req, file, cb) {
          fs.mkdirSync(path, { recursive: true });
          cb(null, path);
        },
        // change file name
        filename(req, file, cb) {
          if (file?.mimetype.split('/')[0] !== 'image') {
            throw new InputValidationError('File Format Error!');
          }
          // get file extension
          const ext = (extname(file.originalname)).toLowerCase();
          // return renamed file
          cb(null, uuidv4() + ext);
        }
      });

      const upload = multer({ storage });
      return upload.single('image');
    } catch (error) {
      throw new InputValidationError('Can not upload!');
    }
  }
}
