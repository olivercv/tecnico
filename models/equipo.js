'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipoSchema = Schema({
	tipo: {type: Schema.ObjectId, ref:'Tipo'},
	codigo:String,
	marca: String,
	modelo:String,
	serie:String,
	tarjetamadre: String,
	procesador:String,
	memoria:String,
	discoduro:String,
	tarjetavideo:String,
	lector:String,
	so:String,
	antivirus:String,
	garantia:{ type: Date, default: Date.now },
	ip:String,
	mac:String,
	unidad:{type: Schema.ObjectId, ref:'Unidad'},
	funcionarioasignado: String,//{type: Schema.ObjectId, ref:'Funcionario'},
	funcionariousuario: String //{type: Schema.ObjectId, ref:'Funcionario'}
});

module.exports = mongoose.model('Equipo', EquipoSchema);