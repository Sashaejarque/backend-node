const { Router } = require('express');
const { check } = require('express-validator');
const { updateImageCloudinary } = require('../controllers/uploads.controller');
const { allowedCollections } = require('../helpers/db-validators');
const { validateFileToUpload } = require('../helpers/validateFile');
const { validate } = require('../models/product');



const router = Router();

router.put('/:colection/:id', [
    validateFileToUpload,
    check('id', 'The id is not valid').isMongoId(),
    check('colection').custom(c => allowedCollections(c, ['users', 'products'])),
], updateImageCloudinary);

module.exports = router;