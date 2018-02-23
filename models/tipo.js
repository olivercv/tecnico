'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoSchema = Schema({
	descripcion: String,
	formulario: String,
	estado:Number
});

module.exports = mongoose.model('Tipo', TipoSchema);