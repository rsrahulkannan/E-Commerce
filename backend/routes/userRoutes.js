import express from 'express'
import { uploadMiddleware } from '../middleware/multerMiddelware.js';
import { changePassword, updateUser } from '../controller/userController.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/update/:id', verifyUser, uploadMiddleware.single('image'), updateUser);
router.post('/change-password/:id', verifyUser, changePassword);

export default router;