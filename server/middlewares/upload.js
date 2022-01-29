
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadPath = path.join(__dirname, '..', 'InternalFiles/');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const splitFile = file.originalname.split('.');
    const fileExtension = splitFile[splitFile.length - 1];
    cb(null, file.fieldname + '.' + fileExtension);
  },
  onError: function (err, next) {
    console.log('error from multer : ', err);
    next(err);
  }
});
const upload = multer({ storage: storage });

export default upload;
