// Se declara para que visual de la ayuda esto no pasa en TS
const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { createJWT } = require('../helpers/createJWT');

const handleLogin = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Invalid password/user -e'
            });
        }

        if (!user.state) {
            return res.status(400).json({
                msg: 'Invalid password/user state:false'
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password )
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Invalid password/user -p'
            })
        }
        // Creando jwt
        const token = await createJWT(user.id)

        res.json({
            msg: 'Login successfully',
            user,
            jwt: token
        });

    } catch (error){
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        })
    }
   
};

module.exports = {
    handleLogin,
};