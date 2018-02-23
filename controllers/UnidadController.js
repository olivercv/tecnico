'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');


var Unidad = require('../models/unidad');
var Equipo = require('../models/equipo');
var Funcionario = require('../models/funcionario');


function getUnidad(req, res){

	var unidadId = req.params.id;

	Unidad.findById(unidadId, (err, unidad) =>{
		if (err) {
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!unidad) {
				res.status(404).send({message:'La unidad no existe'});
			}else{
				res.status(200).send({unidad});
			}
		}
	});

	
}

function getUnidades(req, res){

	if (req.params.page) {
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerpage = 3;

	Unidad.find().sort('nombre').paginate(page, itemsPerpage, function(err, unidades, total){
		if (err) {
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!unidades) {
				res.status(404).send({message:'No se encontraron unidades'});
			}else{
				return res.status(200).send({
					registros:total,
					unidades:unidades
				});
			}
		}
	});

}

function saveUnidad(req, res){

	var unidad = new Unidad();

	var params = req.body;

	unidad.nombre = params.nombre;
	unidad.interno = params.interno;
	unidad.telefono = params.telefono;
	unidad.direccion = params.direccion;
	unidad.estado = params.estado;

	unidad.save((err, unidadStored) => {
		if (err) {
			res.status(500).send({message:'Error al guardar la unidad'});
		}else{
			if (!unidadStored) {
				res.status(404).send({message:'La unidad no ha sido guardada'});
			}else{
				res.status(200).send({unidad: unidadStored});
			}
		}
	});

}

function updateUnidad(req, res){

	var unidadId = req.params.id;
	var update = req.body;

	Unidad.findByIdAndUpdate(unidadId, update, (err, unidadUpdate) => {
		if (err) {
			res.status(500).send({message:'Error al guardar la unidad'});
		}else{
			if (!unidadUpdate) {
				res.status(404).send({message:'La unidad no ha sido actualizada'});
			}else{
				res.status(200).send({unidad: unidadUpdate});
			}

		}
	});

}

function deleteUnidad(req, res){
	var unidadId = req.params.id;
	//var update = req.body;

	Unidad.findByIdAndRemove(unidadId, (err, unidadRemoved) => {
		if (err) {
			res.status(500).send({message:'Error al remover la unidad'});
		}else{
			if (!unidadRemoved) {
				res.status(404).send({message:'La unidad no ha sido eliminada'});
			}else{
				console.log(unidadRemoved);
				res.status(200).send({unidad:unidadRemoved});
			}
		}
	});

}


module.exports = {
	getUnidad,
	getUnidades,
	saveUnidad,
	updateUnidad,
	deleteUnidad
}