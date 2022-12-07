const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Connect to the database
        this.connectDB();

        // Creacion de path por prolijidad
        this.PRODUCT_PATH = '/api/products';
        this.USER_PATH = '/api/user';
        this.AUTH_PATH = '/api/auth'
        this.CATEGORIES_PATH = '/api/categories';
        this.PRODUCT_PATH = '/api/products';

        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();

    }

    async connectDB() {
       await dbConnection();
    }
    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));


    }
  
    routes() {
       this.app.use(this.PRODUCT_PATH, require('../routes/products'));
       this.app.use(this.USER_PATH, require('../routes/user'));
       this.app.use(this.AUTH_PATH, require('../routes/auth'));
       this.app.use(this.CATEGORIES_PATH, require('../routes/categories'));
       this.app.use(this.PRODUCT_PATH, require('../routes/products'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Running on port ${this.port}`);
            console.log(`http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;