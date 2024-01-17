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
            message: 'Fetched all products',
            products: products,
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
            message: 'Product has been created',
            product: newProduct,
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
                message: 'Product fetched by id',
                product: product,
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

// @desc Update a Product
// route PUT /api/product/:id
// @access Private
const updateProduct = asynchandler(async (req, res) => {
    const { name, description, price } = req.body;
    const files = req.files;
    const imagesToRemove = req.body.imagesToRemove || [];

    try {
        const existingProduct = await Product.findById(req.params.id);
        if (existingProduct) {

            // Remove unwanted images
            let removingImagesPath = [];
            existingProduct.images = existingProduct.images.filter(
                (image) => {
                    if (!imagesToRemove.includes(image._id.toString())) {
                        removingImagesPath.push(image.path);
                        return true; // Keep the image in the array
                    }
                    return false; // Remove the image from the array
                }
            );

            // Add new images
            files.forEach((file) => {
                existingProduct.images.push({
                    filename: file.originalname,
                    path: file.path,
                })
            });

            existingProduct.name = name ? name : existingProduct.name;
            existingProduct.description = description ? description : existingProduct.description;
            existingProduct.price = price ? price : existingProduct.price;

            // await existingProduct.save();

            // Remove unwanted image files from the server
            removingImagesPath.forEach(async (path) => {
                removeMiddleware(req, path);
            });

            res.status(201).json({
                message: 'Product has been updated',
                product: existingProduct
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

// @desc Delete a Product
// route DELETE /api/product/:id
// @access Private
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