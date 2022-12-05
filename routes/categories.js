const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory } = require('../controllers/category.controller');
const { validateJWT, errorValidation } = require('../middlewares');


const router = Router();

// get all categories - public
router.get('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    errorValidation
], createCategory);

// get categorY for id - public
router.get('/:id', (req, res) => {
    res.json({
        msg: 'get por id'
    });
});

// create categorY - private - any role
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    errorValidation
], createCategory);

// actualizar category - private - any role
router.put('/:id', (req, res) => {
    res.json({
        msg: 'put por id'
    });
});

// delete category - private - admin role
router.delete('/:id', (req, res) => {
    res.json({
        msg: 'delete por id'
    }); 
});

module.exports = router;