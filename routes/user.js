const { Router } = require('express');
const { check } = require('express-validator');
const {  getUser, deleteUser, putUser, createUser } = require('../controllers/users.controller');
const { isValidRole, emailExists, isUserExistsByID } = require('../helpers/db-validators');
const { validateJWT, isAdminRole, hasRole, errorValidation} = require('../middlewares');


const router = Router();

router.get('/', getUser);
router.delete('/:id', [
    validateJWT,
   // isAdminRole,
    hasRole( 'ADMIN_ROLE'),
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(isUserExistsByID),
    errorValidation
],deleteUser);

router.put('/:id',[
    // Validando que sea un id mongo valido
    check('id', 'Is not a valid ID').isMongoId(),
    // Validando que el id exista en la DB
    check('id').custom(isUserExistsByID),
    // Si se puede actualizar error validar el rol
    /* check('role').custom(isValidRole), */
    errorValidation,
], putUser);

// El segundo argumento si se le pasan 3 es un middleware 
// en este caso para validar los campos que vienen del post
router.post('/', [
    check('name','The name is required').not().isEmpty(),
    check('password','The password must content more than 6 characters').isLength({min: 6}),
    check('email').custom(emailExists),
    check('role').custom(isValidRole),
    errorValidation 
],createUser);

module.exports = router;