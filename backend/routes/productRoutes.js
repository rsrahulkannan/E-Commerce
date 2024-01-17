import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { addProduct, allProducts, deleteProduct, updateProduct, viewProduct } from '../controller/productController.js';
import { uploadMiddleware } from '../middleware/multerMiddelware.js';

const router = express.Router();

router.get('/', verifyUser, allProducts);
router.post('/', verifyUser, uploadMiddleware.array('images', 5), addProduct);
router.get('/:id', verifyUser, viewProduct);
router.put('/:id', verifyUser, uploadMiddleware.array('images'), updateProduct);
router.delete('/:id', verifyUser, deleteProduct);

export default router;