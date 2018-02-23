'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tecnico',(err, res)=> {

	if (err) {
		throw err;
	}else{
		console.log('la conexion a la base de datos esta corriendo correctamente');
		app.listen(port, function(){
			console.log("Servidor de apiRest de sistema tecnico en http://localhost:"+port);
		});
	}
});