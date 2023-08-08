import express from 'express';
import { authUser, forgotPassword, registerUser, resetPassword, verifyToken, verifyUrl } from '../controller/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser)
router.get('/:id/verify/:token', verifyToken);
router.post('/forgot-password', forgotPassword);
router.post('/:id/reset/:token', resetPassword);
router.get('/:id/reset/:token', verifyUrl);

export default router;