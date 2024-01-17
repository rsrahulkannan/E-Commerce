import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { addProduct, allProducts, deleteProduct, updateProduct, viewProduct } from '../controller/productController.js';

const router = express.Router();

router.get('/', verifyUser, allProducts);
router.post('/', verifyUser, addProduct);
router.get('/:id', verifyUser, viewProduct);
router.post('/:id', verifyUser, updateProduct);
router.delete('/:id', verifyUser, deleteProduct);

export default router;