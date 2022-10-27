// Se declara para que visual de la ayuda esto no pasa en TS
const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUser = (req, res = response) => {
    const params = req.query;

    res.json({
        msg: 'Funcando desde controlador user!',
        queryParams: params
    });
};

const deleteUser = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'Delete desde controlador!',
        deleted_id_item: id
    });
};
const putUser = async (req, res = response) => {
    const {id} = req.params;
    // Extraigo los valores que no quiero que se actualicen
    // Por ejemplo el id y password
    const { _id, password, google, email, state, ...rest} = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }
    // aca le paso el resto del objeto que viene previamente filtrado 
    //Para evitar que me manden datos que no se deben actualizar
    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        msg: 'Put desde controlador!',
        user,
    });
};
const createUser = async (req, res = response) => {

    const body = req.body;
    const { name, email, password, role} = body;
    const user = new User({name, email, password, role});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);


    await user.save();

    res.json({
        user
    });
};


module.exports = {
    getUser,
    deleteUser,
    putUser,
    createUser
};