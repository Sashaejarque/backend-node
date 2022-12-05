// Se declara para que visual de la ayuda esto no pasa en TS
const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { createJWT } = require('../helpers/createJWT');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;
    
    try {
        const { name, picture, email } = await googleVerify(id_token);
        let user = await User.findOne({ email });
        console.log(user);
        // Viendo si el usuario existe en la base de datos
        if (!user) {
            const data = {
                name,
                email,
                password: ':P',
                img: picture,
                google: true,
              /*   role: 'USER_ROLE' */
            }
            user = new User(data);
            await user.save();
        }

        //viendo si el usuario no fue eliminado (state:false)
        if (!user.state) {
            return res.status(401).json({
                msg: 'Unauthorized user'
            })
        }

        // Creando jwt
        const token = await createJWT(user.id)
        
        res.json({
            msg: 'Google sign in successfully',
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        })
    }
};

module.exports = {
    handleLogin,
    googleSignIn
};