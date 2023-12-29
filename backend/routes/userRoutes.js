import express from 'express';
import { authUser, forgotPassword, registerUser, resetPassword, verifyToken, verifyUrl } from '../controller/userController.js';
import { uploadMiddleware } from '../middleware/multerMiddelware.js';

const router = express.Router();

router.post('/', uploadMiddleware.single('image'), registerUser);
router.post('/auth', authUser)
router.get('/:id/verify/:token', verifyToken);
router.post('/forgot-password', forgotPassword);
router.post('/:id/reset/:token', resetPassword);
router.get('/:id/reset/:token', verifyUrl);

export default router;