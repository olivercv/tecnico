'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');


var Tipo = require('../models/tipo');
var Equipo = require('../models/equipo');


function getTipo(req, res){

	var tipoId = req.params.id;

	Tipo.findById(tipoId, (err, tipo) =>{
		if (err) {
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!tipo) {
				res.status(404).send({message:'El tipo no existe'});
			}else{
				res.status(200).send({tipo});
			}
		}
	});

	
}

function getTipos(req, res){

	if (req.params.page) {
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerpage = 5;

	Tipo.find().sort('descripcion').paginate(page, itemsPerpage, function(err, tipos, total){
		if (err) {
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!tipos) {
				res.status(404).send({message:'No hay Tipos'});
			}else{
				return res.status(200).send({
					registros:total,
					tipos:tipos
				});
			}
		}
	});

}
function getTiposTotal(req, res){

	if (req.params.page) {
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerpage = 999;

	Tipo.find().sort('descripcion').paginate(page, itemsPerpage, function(err, tipos, total){
		if (err) {
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!tipos) {
				res.status(404).send({message:'No hay Tipos'});
			}else{
				return res.status(200).send({
					registros:total,
					tipos:tipos
				});
			}
		}
	});

}


function saveTipo(req, res){

	var tipo = new Tipo();

	var params = req.body;

	tipo.descripcion = params.descripcion;
	tipo.formulario = params.formulario;
	tipo.estado = params.estado;

	tipo.save((err, tipoStored) => {
		if (err) {
			res.status(500).send({message:'Error al guardar el tipo'});
		}else{
			if (!tipoStored) {
				res.status(404).send({message:'El tipo no ha sido guardado'});
			}else{
				res.status(200).send({tipo: tipoStored});
			}
		}
	});

}

function updateTipo(req, res){

	var tipoId = req.params.id;
	var update = req.body;

	Tipo.findByIdAndUpdate(tipoId, update, (err, tipoUpdate) => {
		if (err) {
			res.status(500).send({message:'Error al guardar el tipo'});
		}else{
			if (!tipoUpdate) {
				res.status(404).send({message:'El tipo no ha sido actualizado'});
			}else{
				res.status(200).send({tipo: tipoUpdate});
			}

		}
	});

}

function deleteTipo(req, res){
	var tipoId = req.params.id;
	//var update = req.body;

	Tipo.findByIdAndRemove(tipoId, (err, tipoRemoved) => {
		if (err) {
			res.status(500).send({message:'Error al guardar el tipo'});
		}else{
			if (!tipoRemoved) {
				res.status(404).send({message:'El tipo no ha sido eliminado'});
			}else{
				console.log(tipoRemoved);
				res.status(200).send({tipo:tipoRemoved});
			}
		}
	});


}


module.exports = {
	getTipo,
	saveTipo,
	getTipos,
	getTiposTotal,
	updateTipo,
	deleteTipo
}