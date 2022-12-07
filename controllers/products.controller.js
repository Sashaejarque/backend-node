// Se declara para que visual de la ayuda esto no pasa en TS
const { response } = require('express');
const Product = require('../models/product');
const Category = require('../models/categories');

const getProducts = (req, res = response) => {
    const params = req.query;

    res.json({
        msg: 'Get desde controlador!',
        queryParams: params
    });
};

const deleteProducts = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'Delete desde controlador!',
        deleted_id_item: id
    });
};
const putProducts = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'Put desde controlador!',
        User_id: id
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
    /* res.json({data}) */
    res.status(201).json({
        msg: 'Product created successfully',
        product
    });
    
};


module.exports = {
    getProducts,
    deleteProducts,
    putProducts,
    createProducts
};