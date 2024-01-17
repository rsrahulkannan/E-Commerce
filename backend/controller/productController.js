import asynchandler from 'express-async-handler';
import Product from '../model/productModel.js';
import { removeMiddleware } from '../middleware/multerMiddelware.js';

// @desc Get Products
// route GET /api/product
// @access Private
const allProducts = asynchandler(async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            products: products,
            message: 'Fetched all products'
        })
    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
});

// @desc Add Product
// route POST /api/product
// @access Private
const addProduct = asynchandler(async (req, res) => {
    const { name, description, price } = req.body;
    const files = req.files;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            images: [],
            createdBy: req.user.userId
        });

        files.forEach(file => {
            newProduct.images.push({
                filename: file.originalname,
                path: file.path
            })
        });

        await newProduct.save();
        res.status(200).json({
            product: newProduct,
            message: 'Product has been created'
        })
    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
});

// @desc Get a Product
// route GET /api/product/:id
// @access Private
const viewProduct = asynchandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json({
                product: product,
                message: 'Product fetched by id'
            })
        } else {
            res.status(400);
            throw new Error('Product id is invalid');
        }
    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
});

const updateProduct = asynchandler(async (req, res) => {
    res.status(201).json({
        message: 'Coming soon'
    })
});

const deleteProduct = asynchandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            const images = product.images;
            images.forEach(image => {
                removeMiddleware(req, image.path);
            });

            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: 'Product has been deleted'
            })

        } else {
            res.status(400);
            throw new Error('Product id is invalid');
        }
    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
});

export {
    allProducts,
    addProduct,
    updateProduct,
    viewProduct,
    deleteProduct
};