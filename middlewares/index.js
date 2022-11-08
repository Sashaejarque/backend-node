const  isAdminRole= require('../middlewares/validateRole');
const  hasRole = require('../middlewares/validateRole');
const  errorValidation  = require('../middlewares/field-validation');
const validateJWT  = require('../middlewares/validateJWT');

module.exports = {
    ...isAdminRole,
    ...hasRole,
    ...errorValidation,
    ...validateJWT
};