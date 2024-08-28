import multer from 'multer';

// Configure storage to store files in memory
const storage = multer.memoryStorage();

// Define file filter to allow only specific types of files (images and PDFs)
const fileFilter = (req, file, cb) => {
    // Regular expression to match allowed file extensions
    const allowedTypes = /\.(jpg|jpeg|png|pdf)$/;
    if (!file.originalname.match(allowedTypes)) {
        return cb(new Error('Please upload a valid image or PDF file.'));
    }
    cb(null, true);
};

// Configure multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
});

// Export single file upload middleware
export const singleUpload = upload.single('file');
