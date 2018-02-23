'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');


var Gestion = require('../models/gestion');
var Equipo = require('../models/equipo');


function getGestion(req, res){

	var gestionId = req.params.id;

	Gestion.findById(gestionId, (err, gestion) =>{
		if (err) {
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!gestion) {
				res.status(404).send({message:'La gestión no existe'});
			}else{
				res.status(200).send({gestion});
			}
		}
	});
}

function getGestiones(req, res){

	if (req.params.page) {
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerpage = 5;

	Gestion.find().sort('numero').paginate(page, itemsPerpage, function(err, gestiones, total){
		if (err) {
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!gestiones) {
				res.status(404).send({message:'No hay Gestiones'});
			}else{
				return res.status(200).send({
					registros:total,
					gestiones:gestiones
				});
			}
		}
	});

}
function getGestionesTotal(req, res){

	if (req.params.page) {
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerpage = 999;

	Gestion.find().sort('numero').paginate(page, itemsPerpage, function(err, gestiones, total){
		if (err) {
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!gestiones) {
				res.status(404).send({message:'No hay Gestiones'});
			}else{
				return res.status(200).send({
					registros:total,
					gestiones:gestiones
				});
			}
		}
	});

}


function saveGestion(req, res){

	var gestion = new Gestion();

	var params = req.body;

	gestion.numero = params.numero;
    gestion.anio = params.anio;
    gestion.descripcion = params.descripcion;
	gestion.estado = params.estado;

	gestion.save((err, gestionStored) => {
		if (err) {
			res.status(500).send({message:'Error al guardar la gestion'});
		}else{
			if (!gestionStored) {
				res.status(404).send({message:'La gestion no ha sido guardada'});
			}else{
				res.status(200).send({gestion: gestionStored});
			}
		}
	});

}

function updateGestion(req, res){

	var gestionId = req.params.id;
	var update = req.body;

	Gestion.findByIdAndUpdate(gestionId, update, (err, gestionUpdate) => {
		if (err) {
			res.status(500).send({message:'Error al guardar la gestion'});
		}else{
			if (!gestionUpdate) {
				res.status(404).send({message:'La gestion no ha sido actualizada'});
			}else{
				res.status(200).send({gestion: gestionUpdate});
			}

		}
	});

}

function deleteGestion(req, res){
	var gestionId = req.params.id;
	//var update = req.body;

	Gestion.findByIdAndRemove(gestionId, (err, gestionRemoved) => {
		if (err) {
			res.status(500).send({message:'Error al guardar la gestión'});
		}else{
			if (!gestionRemoved) {
				res.status(404).send({message:'La gestion no ha sido eliminada'});
			}else{
				console.log(gestionRemoved);
				res.status(200).send({gestion:gestionRemoved});
			}
		}
	});
}

module.exports = {
	getGestion,
	saveGestion,
	getGestiones,
	getGestionesTotal,
	updateGestion,
	deleteGestion
}