import asynchandler from 'express-async-handler';
import Product from '../model/productModel.js';

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

const viewProduct = asynchandler(async (req, res) => {
    res.status(201).json({
        message: 'Coming soon'
    })
});

const updateProduct = asynchandler(async (req, res) => {
    res.status(201).json({
        message: 'Coming soon'
    })
});

const deleteProduct = asynchandler(async (req, res) => {
    res.status(201).json({
        message: 'Coming soon'
    })
});

export {
    allProducts,
    addProduct,
    updateProduct,
    viewProduct,
    deleteProduct
};