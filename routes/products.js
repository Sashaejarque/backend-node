const { Router } = require('express');
const { check } = require('express-validator');
const { getProduct, deleteProducts, updateProduct, createProducts, getAllProducts } = require('../controllers/products.controller');
const { isValidCategory, isProductInDb } = require('../helpers/db-validators');
const { validateJWT, errorValidation, hasRole } = require('../middlewares');


const router = Router();

router.get('/', getAllProducts);

router.get('/:id', [
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(isProductInDb),
    errorValidation
], getProduct);

router.delete('/:id', [
    validateJWT,
     hasRole( 'ADMIN_ROLE'),
    check('id', 'The id is not valid mongo id').isMongoId(),
    check('id').custom(isProductInDb),
     errorValidation
], deleteProducts);

router.put('/:id', [
    validateJWT,
    check('id', 'The id is not valid mongo id').isMongoId(),
    check('id').custom(isProductInDb),
    errorValidation
], updateProduct);

router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('category').custom(isValidCategory),
    check('price', 'The price is required').not().isEmpty(),
    errorValidation
], createProducts);

module.exports = router;