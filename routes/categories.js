const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory} = require('../controllers/category.controller');
const { validateJWT, errorValidation, hasRole } = require('../middlewares');
const { isCategoryExistsByID } = require('../helpers/db-validators');


const router = Router();

// get all categories - public
router.get('/', getAllCategories);

// get categorY for id - public
router.get('/:id', [
    check('id', 'The id is not valid mongo id').isMongoId(),
   check('id').custom(isCategoryExistsByID),
    errorValidation
], getCategory);

// create categorY - private - any role
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    errorValidation
], createCategory);

// actualizar category - private - any role
router.put('/:id', [
    check('id', 'The id is not valid mongo id').isMongoId(),
   check('id').custom(isCategoryExistsByID),
    errorValidation
], updateCategory);

// delete category - private - admin role
router.delete('/:id', [
    validateJWT,
     hasRole( 'ADMIN_ROLE'),
    check('id', 'The id is not valid mongo id').isMongoId(),
    check('id').custom(isCategoryExistsByID),
     errorValidation
], deleteCategory);

module.exports = router;