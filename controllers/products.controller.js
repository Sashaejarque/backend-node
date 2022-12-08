// Se declara para que visual de la ayuda esto no pasa en TS
const { response } = require('express');
const Product = require('../models/product');
const Category = require('../models/categories');

const getAllProducts = async (req, res = response) => {
    const {limit = 5, from = 0} = req.query;

    // Parse de string a int
    const limitParse = Number(limit);
    const fromParse = Number(from);

    // Validacion para evitar no pasar un NaN
    const fromValidation = typeof fromParse === 'number' ? fromParse : 0;
    const limitValidation = typeof limitParse === 'number' ? limitParse : 5;

    const query = { state: true };

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(fromValidation))
            .limit(Number(limitValidation))
    ]);

    res.json({
        total,
        products
    }); 
};

const deleteProducts = async (req, res = response) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, {state: false});
    res.json({
        msg: 'Product deleted correctly',
        product
    });
};
const updateProduct = async (req, res = response) => {
    const {id} = req.params;
    const {state, user, ...data} = req.body;
    const response = await Product.findByIdAndUpdate(id, data);
    res.json({
        msg: 'Product updated correctly',
        response
    });
};
const createProducts = async (req, res = response) => {
    const body = req.body;
    const isProductInDb = await Product.findOne({name: body.name});
    
    if (isProductInDb) {
        return res.status(400).json({
            msg: `The product ${body.name} already exists`
        });
    }

    const category = await Category.findOne({name: req.body.category});

    const data = {
        ...req.body,
        user: req.user._id,
        category: category._id,
    }
    
    const product = new Product(data);
    await product.save();

    res.status(201).json({
        msg: 'Product created successfully',
        product
    });
    
};

const getProduct = async (req, res = response) => {
    const {id} = req.params;
    const response = await Product.findById(id);
    res.json(response);
};

module.exports = {
    getAllProducts,
    deleteProducts,
    updateProduct,
    createProducts,
    getProduct,
};
