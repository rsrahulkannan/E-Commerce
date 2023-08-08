import express from 'express';
import { registerUser, verifyToken } from '../controller/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/:id/verify/:token', verifyToken);

export default router;