import asynchandler from 'express-async-handler';
import Product from '../model/productModel.js';

const allProducts = asynchandler(async (req, res) => {
    res.status(201).json({
        message: 'Coming soon'
    })
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
            data: {
                product: newProduct
            },
            message: 'You have been updated your account'
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