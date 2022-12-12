const { Schema, model } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true,
    },
    state: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },
    img: {
        type: String
    },
});

productSchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject();
    return {...data};
}

module.exports = model('Product', productSchema);