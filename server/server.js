const express = require('express');
const cors = require('cors');
require('dotenv').config({path: './config.env'});


// const fileUpload = require('express-fileupload');

const connnectDB = require('../conf/db');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 8080;

        this.paths = {
            // auth:       '/api/auth',
            // buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            // usuarios:   '/api/usuarios',
            // uploads:    '/api/uploads',
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        // this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await connnectDB();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        
        // this.app.use( this.paths.auth, require('../routes/auth'));
        // this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use( this.paths.productos, require('../routes/productos.routes'));
        // this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        // this.app.use( this.paths.uploads, require('../routes/uploads'));
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto' );
        });
    }

}

module.exports = Server;