'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UnidadSchema = Schema({
	nombre: String,
	interno:String,
	telefono: String,
	direccion:String,
	estado:Number
});

module.exports = mongoose.model('Unidad', UnidadSchema);