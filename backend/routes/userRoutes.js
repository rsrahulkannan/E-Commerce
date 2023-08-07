import express from 'express';
import { registerUser } from '../controller/userController.js';

const router = express.Router();

router.post('/', registerUser);

export default router;