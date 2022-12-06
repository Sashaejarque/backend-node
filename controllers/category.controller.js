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

const getAllCategories = async (req, res = response) => {
    const {limit = 5, from = 0} = req.query;

    // Parse de string a int
    const limitParse = Number(limit);
    const fromParse = Number(from);

    // Validacion para evitar no pasar un NaN
    const fromValidation = typeof fromParse === 'number' ? fromParse : 0;
    const limitValidation = typeof limitParse === 'number' ? limitParse : 5;

    const query = { state: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            /* .populate('user', 'name') */
            .skip(Number(fromValidation))
            .limit(Number(limitValidation))
    ]);

    res.json({
        total,
        categories
    });
};

module.exports = {
    createCategory,
    getAllCategories
}
