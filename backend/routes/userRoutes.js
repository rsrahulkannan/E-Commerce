import express from 'express';
import { authUser, registerUser, verifyToken } from '../controller/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser)
router.get('/:id/verify/:token', verifyToken);

export default router;