import express from 'express'
import { uploadMiddleware } from '../middleware/multerMiddelware.js';
import { updateUser } from '../controller/userController.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/update/:id', verifyUser, uploadMiddleware.single('image'), updateUser);

export default router;