import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.originalUrl.startsWith('/api/product'))
            cb(null, './backend/Public/ProductImages');
        else
            cb(null, './backend/Public/ProfilePictures');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'));
    }
}

const uploadMiddleware = multer({
    storage,
    fileFilter
})

const removeMiddleware = (req, filename) => {
    try {
        if (req.originalUrl.startsWith('/api/product'))
            fs.unlinkSync(`./${filename}`);
        else
            fs.unlinkSync(`./backend/Public/ProfilePictures/${filename}`);
    } catch (error) {
        console.error(`Error removing file ${filename}: ${error.message}`);
    }
}

export { uploadMiddleware, removeMiddleware };