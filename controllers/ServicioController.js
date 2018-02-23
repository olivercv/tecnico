'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');


var Servicio = require('../models/servicio');

function getServicio(req, res){

	var servicioId = req.params.id;

	Servicio.findById(servicioId, (err, servicio) =>{
		if (err) {
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!servicio) {
				res.status(404).send({message:'El servicio no existe'});
			}else{
				res.status(200).send({servicio});
			}
		}
	});

	
}

function getServicios(req, res){

	if (req.params.page) {
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerpage = 8;
	
	Servicio.find({}).sort('numero').populate({path:'gestion'}).populate({path:'equipo'}).populate({path:'usuario'}).paginate(page, itemsPerpage, function(err, servicios, total){
		if (err) {
			res.status(500).send({message:'Error en la petición',error: err});
		}else{
			if (!servicios) {
				res.status(404).send({message:'No hay Servicios'});
			}else{

				return res.status(200).send({
					registros:total,
					servicios:servicios
				});
			}
		}
	});

	
	

}

function saveServicio(req, res){

	var servicio = new Servicio();

	var params = req.body;

	console.log('params');

	servicio.numero = params.numero;
	servicio.gestion = params.gestion;
	servicio.equipo = params.equipo;
	servicio.tiposervicio = params.tiposervicio;
	servicio.fechaingreso = params.fechaingreso;
	servicio.responsablenetrega = params.responsableentrega;
	servicio.tecnicoasignado = params.tecnicoasignado;
	servicio.problema = params.problema;
	servicio.fechainicio = params.fechainicio;
	servicio.fechaterminado = params.fechaterminado;
	servicio.informe = params.informe;
	servicio.fechaegreso = params.fechaegreso;
	servicio.tecnicoegreso = params.tecnicoegreso
	servicio.responsableegreso = params.responsableegreso;
	servicio.estado = params.estado;
	

	servicio.save((err, servicioStored) => {
		if (err) {
			
			res.status(500).send({message:err});
		}else{
			if (!servicioStored) {
				res.status(404).send({message:'El servicio técnico no ha sido guardado'});
			}else{
				res.status(200).send({servicio: servicioStored});
			}
		}
	});

}

function updateServicio(req, res){

	var servicioId = req.params.id;
	var update = req.body;

	Servicio.findByIdAndUpdate(servicioId, update, (err, servicioUpdate) => {
		if (err) {
			res.status(500).send({message:'Error al actualizar el servicio'});
		}else{
			if (!servicioUpdate) {
				res.status(404).send({message:'El servicio no ha sido actualizado'});
			}else{
				res.status(200).send({servicio: servicioUpdate});
			}

		}
	});

}

function deleteServicio(req, res){
	var servicioId = req.params.id;
	//var update = req.body;

	Servicio.findByIdAndRemove(servicioId, (err, servicioRemoved) => {
		if (err) {
			res.status(500).send({message:'Error al remover el servicio'});
		}else{
			if (!servicioRemoved) {
				res.status(404).send({message:'El servicio no ha sido eliminado'});
			}else{
				console.log(servicioRemoved);
				res.status(200).send({servicio:servicioRemoved});
			}
		}
	});


}


module.exports = {
	getServicio,
	getServicios,
	saveServicio,
	updateServicio,
	deleteServicio
}