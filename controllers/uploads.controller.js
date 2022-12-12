const { response } = require("express");
const Product = require("../models/product");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const updateImageCloudinary = async(req, res = response ) => {

    const { id, colection } = req.params;

    let model;

    switch ( colection ) {
        case 'users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No exists this user ${ id }`
                });
            }
        
        break;

        case 'products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No exists this product ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ msg: 'Internarl server error'});
    }


   // Limpiar imágenes previas
   if ( model.img ) {
    const nombreArr = model.img.split('/');
    const nombre = nombreArr[ nombreArr.length - 1 ];
    const [ public_id ] = nombre.split('.');
    cloudinary.uploader.destroy( public_id );
}


const { tempFilePath } = req.files.file
const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
model.img = secure_url;

await model.save();


res.json( model );

}


module.exports = {
    updateImageCloudinary,
}