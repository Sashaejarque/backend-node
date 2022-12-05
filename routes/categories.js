const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares');


const router = Router();

// get all categories - public
router.get('/', (req, res) => {
    res.json({
        msg: 'get API - controller'
    });
});

// get categorY for id - public
router.get('/:id', (req, res) => {
    res.json({
        msg: 'get por id'
    });
});

// create categorY - private - any role
router.post('/', (req, res) => {
    res.json({
        msg: 'POST CATEGORY'
    });
});

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