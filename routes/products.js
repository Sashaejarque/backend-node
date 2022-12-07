const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, deleteProducts, putProducts, createProducts } = require('../controllers/products.controller');
const { isValidCategory } = require('../helpers/db-validators');
const { validateJWT, errorValidation } = require('../middlewares');


const router = Router();

router.get('/', getProducts);
router.delete('/:id', deleteProducts);
router.put('/:id', putProducts);

router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('category').custom(isValidCategory),
    check('price', 'The price is required').not().isEmpty(),
    errorValidation
], createProducts);

module.exports = router;