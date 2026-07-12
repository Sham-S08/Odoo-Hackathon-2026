const multer = require('multer');
const env = require('./env');

// Use memory storage; upload to Cloudinary from memory buffer.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'image/jpg',
    'image/webp'
  ];

  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Allowed: images (jpg/png/webp) and PDFs.'));
  }
  cb(null, true);
};

function createMulterUpload() {
  return multer({
    storage,
    limits: {
      fileSize: env.upload.maxSizeMB * 1024 * 1024
    },
    fileFilter
  });
}

module.exports = { createMulterUpload };

