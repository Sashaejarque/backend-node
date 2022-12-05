const { response } = require("express");
const Category = require('../models/categories');

const createCategory = async (req, res = response) => {
    const name = req.body.name.toUpperCase();

    const isCategoryInDB = await Category.findOne({ name })

    if (isCategoryInDB) {
        return res.status(400).json({
            msg: `The category ${name} already exists`
        });
    }

    const data = {
        name,
        user: req.user._id
    };

    const category = new Category(data);
    
    // guardando en DB
    await category.save();

    res.status(201).json(category);
};

module.exports = {
    createCategory,
}
