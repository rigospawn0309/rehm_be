const express = require('express');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fileUpload = require('express-fileupload');
const xss = require('xss-clean');
const hpp = require('hpp');
require('dotenv').config({path: '../.env'});
const AppError = require('../utils/appError');
const connnectDB = require('../conf/db');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 8080;

        this.paths = {
            // auth:       '/api/auth',
            // buscar:     '/api/buscar',
            categorias: '/api/v1/categorias',
            productos:  '/api/v1/productos',
            // usuarios:   '/api/usuarios',
            // uploads:    '/api/uploads',
        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        
    };

    async conectarDB() {
        await connnectDB();
    };


    middlewares() {

                // Allow Cross-Origin requests
        this.app.use(cors());

        // Establecer encabezados HTTP de seguridad
        this.app.use(helmet());

        // Limitar solicitud de la misma API
        const limiter = rateLimit({
            max: 150,
            windowMs: 60 * 60 * 1000,
            message: 'Demasiadas peticiones desde esta IP, Por favor intente de nuevo en una hora'
        });
        this.app.use('/api', limiter);

        // Body parser, lectura y parseo del body
        this.app.use(express.json({
            limit: '15kb'
        }));

        // Sanitización de datos contra la inyección de consultas Nosql
        this.app.use(mongoSanitize());
        // Sanitización de datos contra XSS (limpie la entrada del usuario del código HTML malicioso
        this.app.use(xss());

        // Prevenir la contaminación de parámetros
        this.app.use(hpp());

        // Directorio Público
        this.app.use( express.static('public') );

        this.app.use(mongoSanitize());
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
        this.app.use( this.paths.categorias, require('../routes/v1/categorias.routes'));
        this.app.use( this.paths.productos, require('../routes/v1/productos.routes'));
        // this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        // this.app.use( this.paths.uploads, require('../routes/uploads'));
        // handle undefined Routes
        this.app.use('*', (req, res, next) => {
        const err = new AppError(404, 'fail', 'Ruta no definida');
        next(err, req, res, next);
        });
    };

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto',this.port );
        });
    }

}

module.exports = Server;