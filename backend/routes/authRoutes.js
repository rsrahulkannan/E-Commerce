import express from 'express';
import { authUser, forgotPassword, registerUser, resetPassword, signout, verifyToken, verifyUrl } from '../controller/authController.js';
import { uploadMiddleware } from '../middleware/multerMiddelware.js';

const router = express.Router();

router.post('/register', uploadMiddleware.single('image'), registerUser);
router.post('/login', authUser)
router.get('/:id/verify/:token', verifyToken);
router.post('/forgot-password', forgotPassword);
router.post('/:id/reset/:token', resetPassword);
router.get('/:id/reset/:token', verifyUrl);
router.get('/logout', signout)

export default router;