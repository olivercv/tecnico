'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GestionSchema = Schema({
    numero:Number,
	anio: String,
	descripcion: String,
	estado:Number
});

module.exports = mongoose.model('Gestion', GestionSchema);