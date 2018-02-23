'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
	nombres: String,
	apellidos:String,
	usuario: String,
	email:String,
	password:String,
	role: String,//{type: Schema.ObjectId, ref:'Role'},
	image:String,
	estado:Number
});

module.exports = mongoose.model('Usuario', UsuarioSchema);