'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//cargar rutas
var UsuarioRutes = require('./routes/UsuarioRute');
var RoleRutes = require('./routes/RoleRute');
var GestionRutes = require('./routes/GestionRute');
var TipoRutes = require('./routes/TipoRute');
var UnidadRutes = require('./routes/UnidadRute');
var EquipoRutes = require('./routes/EquipoRute');
var ServicioRutes = require('./routes/ServicioRute');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//configurar cabeceras http

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Heade-Request-Method');
	res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//rutas base
//app.use(express.static(path.join(__dirname,'client')));

app.use('/', express.static('client', {redirect:false}));

app.use('/api',UsuarioRutes);
app.use('/api',RoleRutes);
app.use('/api',GestionRutes);
app.use('/api',TipoRutes);
app.use('/api',UnidadRutes);
app.use('/api',EquipoRutes);
app.use('/api',ServicioRutes);

app.get('*', function(req, res, next){
	res.sendFile(path.resolve('client/index.html'));
});

/*
app.get('/pruebas', function(req, res){

	res.status(200).send({message:'Bienvenido a la base de datos tecnico'});

});
*/

module.exports = app;