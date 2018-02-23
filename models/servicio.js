'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServicioSchema = Schema({
	numero:Number,
	gestion:{type: Schema.ObjectId, ref:'Gestion'},
	equipo: {type: Schema.ObjectId, ref:'Equipo'},
	tipoServicio:String,
	fechaingreso: { type: Date, default: Date.now },
	tecnicoingreso: {type: Schema.ObjectId, ref:'Usuario'},
	responsableentrega:Number,//{type: Schema.ObjectId, ref:'Funcionario'},
	tecnicoasignado: {type: Schema.ObjectId, ref:'Usuario'},
	problema:String,
	fechainicio:{ type: Date, default: Date.now },
	fechaterminado:{type: Date, default: Date.now },
	informe:String,
	fechaegreso:{ type: Date, default: Date.now },
	tecnicoegreso:{type: Schema.ObjectId, ref:'Usuario'},
	responsableegreso:Number,//{type: Schema.ObjectId, ref:'Funcionario'},
	estado:Number
	
});

module.exports = mongoose.model('Servicio', ServicioSchema);