import asynchandler from 'express-async-handler';

const allProducts = asynchandler(async (req, res) => {
    res.status(201).json({
        message: 'Coming soon'
    })
});

const addProduct = asynchandler(async (req, res) => {
    res.status(201).json({
        message: 'Coming soon'
    })
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