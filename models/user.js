const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});
// Funcion que elimina atributos del objeto
// el toJSON se ejecuta creando el objeto USER
// retorno user sin password ni version 
UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    return {...user, uid: _id};
}

module.exports = model('User', UserSchema);