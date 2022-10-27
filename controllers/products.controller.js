// Se declara para que visual de la ayuda esto no pasa en TS
const { response } = require('express');

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
const createProducts = (req, res = response) => {
    const body = req.body;

    res.json({
        msg: 'Post desde controlador!',
        body
    });
};


module.exports = {
    getProducts,
    deleteProducts,
    putProducts,
    createProducts
};