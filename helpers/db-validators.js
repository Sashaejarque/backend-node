const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const validRole = await Role.findOne({role});
    if(!validRole) {
        throw new Error(`The role ${role} is not registered in the database`);
    }
};

const emailExists = async (email = '') => {
    // Chequeando si existe el email en la DB
    const isEmailExists = await User.findOne({email});
    if (isEmailExists) {
        /* return res.status(400).json({
            msg: 'The email already exists'
        }); */
        throw new Error(`The role ${email} already exists in the database`);
    }

}

const isUserExistsByID = async (id) => {
    const isIdExists = await User.findById(id);
    if (!isIdExists) {
        throw new Error(`The id ${id} does not exists in the database`);
    }
};
     
module.exports = {
    isValidRole,
    emailExists,
    isUserExistsByID,
};