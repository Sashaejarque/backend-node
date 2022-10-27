const { Router } = require('express');
const { getProducts, deleteProducts, putProducts, createProducts } = require('../controllers/products.controller');


const router = Router();

router.get('/', getProducts);
router.delete('/:id', deleteProducts);
router.put('/:id', putProducts);
router.post('/', createProducts);

module.exports = router;