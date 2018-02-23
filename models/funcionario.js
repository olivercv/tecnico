'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FuncionarioSchema = Schema({
	nombres: String,
	apellidos:String,
	ci: String,
	unidad:{type: Schema.ObjectId, ref:'Unidad'},
	coorporativo:String,
	celular: String,
	interno:String,
	estado:Number
});

module.exports = mongoose.model('Funcionario', FuncionarioSchema);