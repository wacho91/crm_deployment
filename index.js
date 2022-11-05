const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'});

//Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});

//Crear el servidor
const app = express();

//Habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Definir un dominio (s) para recibir peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        //Revisar si la peticion viene de un servidor que esta en whitelist
        const existe = whitelist.some( dominio => dominio === origin );
        if(existe) {
            callback(null, true);
        }else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

//Habilitar cors
app.use(cors(corsOptions));

//Rutas de la app
app.use('/', routes());

//Carpeta publica
app.use(express.static('uploads'));

//Puerto
app.listen(3001);