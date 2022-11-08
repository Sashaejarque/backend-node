// Se declara para que visual de la ayuda esto no pasa en TS
const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUser = async (req, res = response) => {
    // Preparando la paginacion
    // ejemplo de url: http://localhost:8080/api/users?limit=5&from=0
    const {limit = 5, from = 0} = req.query;
    // Parse de string a int
    const limitParse = Number(limit);
    const fromParse = Number(from);
    // Validacion para evitar no pasar un NaN
    const fromValidation = typeof fromParse === 'number' ? fromParse : 0;
    const limitValidation = typeof limitParse === 'number' ? limitParse : 5;

    /* const users = await User.find({ state: true })
    .skip(fromValidation)
    .limit(limitValidation);

    const total = await User.countDocuments({ state: true }); */

    // Para poder hacer las dos peticiones al mismo tiempo se usa el Promise.all
    // Entonces evitas que la linea 14 se ejecute y la 15 recien cuando termine de ejecutarse la 14

    const [total, users] = await Promise.all([
        User.countDocuments({ state: true }),
        User.find({ state: true })
            .skip(fromValidation)
            .limit(limitValidation)

    ]);

    res.json({
        msg: 'trayendo todos los usuarios',
        users,
        total
    });
};

const deleteUser = async (req, res = response) => {
    const {id} = req.params;

    // Borrado fisico
    // const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id, {state: false});
    
    // Obtener el usuario loggeado desde la req
    /* const authenticatedUser = req.user; */

    res.json({
        msg: 'User deleted correctly',
        user,
        /* authenticatedUser */
        
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

    res.json({user});
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