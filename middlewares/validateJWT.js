const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("tkn-authorize");

  if (!token) {
    return res.status(401).json({
      msg: "Resource forbidden",
    });
  }

  try {
    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    /* console.log(authenticatedUser) */
    // Puedo agregar al req (esta es la referencia de la req que luego usaran las proximas funciones)
    // el id 
    /* req.uid = uid; */
    // aca si lo hago busco el usuario autenticado y se lo paso al req.user
    const authenticatedUser = await User.findById(uid)

    if (!authenticatedUser) {
        return res.status(401).json({
            msg: 'Resource forbidden, the user doesnt exist in DB '
        })
    }

    // verificar si el usuario tiene el estaod en true
    if (!authenticatedUser.state) {
        return res.status(401).json({
            msg: 'Resource forbidden, state: false '
        })
    }
    req.user = authenticatedUser
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      msg: "Invalid token",
    });
  }

};

module.exports = {
  validateJWT,
};
