const { createMulterUpload } = require('../config/multer');

const upload = createMulterUpload();

// Generic file upload middleware; controllers can specify fields via multer.
const uploadSingle = (fieldName) => upload.single(fieldName);

module.exports = { upload, uploadSingle };

