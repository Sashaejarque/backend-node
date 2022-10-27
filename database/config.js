const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Al activar estas funciones rompe mongo 
            /* useCreateIndex: true,
            useFindAndModify: false */
        })
        console.log('Database online');
    } catch (error) {
        console.log(error);
        throw new Error('Error trying to connect to the database');
    }
};

module.exports = {
    dbConnection,
};