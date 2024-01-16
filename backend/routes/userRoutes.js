import express from 'express'
import { uploadMiddleware } from '../middleware/multerMiddelware.js';
import { updateUser } from '../controller/userController.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/update/:id', verifyUser, updateUser);

export default router;