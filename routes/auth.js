const { Router } = require('express');
const { check } = require('express-validator');
const { handleLogin, googleSignIn } = require('../controllers/auth.controller');
const { errorValidation } = require('../middlewares/field-validation');

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    errorValidation,
], handleLogin);

router.post('/google', [
    check('id_token', 'the token id is required').not().isEmpty(),
    errorValidation,
], googleSignIn);

module.exports = router;