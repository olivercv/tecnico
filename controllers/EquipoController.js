'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');


var Tipo = require('../models/tipo');
var Equipo = require('../models/equipo');

function getEquipo(req, res){

	var equipoId = req.params.id;

	Equipo.findById(equipoId, (err, equipo) =>{
		if (err) {
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!equipo) {
				res.status(404).send({message:'El equipo no existe'});
			}else{
				res.status(200).send({equipo});
			}
		}
	});

	
}

function getEquipos(req, res){

	if (req.params.page) {
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerpage = 8;
	
	Equipo.find({}).sort('fecha').populate({path:'tipo'}).populate({path:'unidad'}).paginate(page, itemsPerpage, function(err, equipos, total){
		if (err) {
			res.status(500).send({message:'Error en la petición',error: err});
		}else{
			if (!equipos) {
				res.status(404).send({message:'No hay Equipos'});
			}else{

				return res.status(200).send({
					registros:total,
					equipos:equipos
				});
			}
		}
	});

	
	

}

function saveEquipo(req, res){

	var equipo = new Equipo();

	var params = req.body;

	console.log('params');

	equipo.tipo = params.tipo;
	equipo.codigo = params.codigo;
	equipo.marca = params.marca;
	equipo.modelo = params.modelo;
	equipo.serie = params.serie;
	equipo.tarjetamadre = params.tarjetamadre;
	equipo.procesador = params.procesador;
	equipo.memoria = params.memoria;
	equipo.discoduro = params.discoduro;
	equipo.tarjetavideo = params.tarjetavideo;
	equipo.lector = params.lector;
	equipo.so = params.so;
	equipo.antivirus = params.antivirus;
	equipo.garantia = params.garantia;
	equipo.ip = params.ip;
	equipo.mac = params.mac;
	equipo.unidad = params.unidad;
	equipo.funcionarioasignado = params.funcionarioasignado;
	equipo.funcionariousuario = params.funcionariousuario;
	

	equipo.save((err, equipoStored) => {
		if (err) {
			
			res.status(500).send({message:err});
		}else{
			if (!equipoStored) {
				res.status(404).send({message:'El equipo no ha sido guardado'});
			}else{
				res.status(200).send({equipo: equipoStored});
			}
		}
	});

}

function updateEquipo(req, res){

	var equipoId = req.params.id;
	var update = req.body;

	Equipo.findByIdAndUpdate(equipoId, update, (err, equipoUpdate) => {
		if (err) {
			res.status(500).send({message:'Error al actualizar el equipo'});
		}else{
			if (!equipoUpdate) {
				res.status(404).send({message:'El tipo no ha sido actualizado'});
			}else{
				res.status(200).send({equipo: equipoUpdate});
			}

		}
	});

}

function deleteEquipo(req, res){
	var equipoId = req.params.id;
	//var update = req.body;

	Equipo.findByIdAndRemove(equipoId, (err, equipoRemoved) => {
		if (err) {
			res.status(500).send({message:'Error al remover el equipo'});
		}else{
			if (!equipoRemoved) {
				res.status(404).send({message:'El equipo no ha sido eliminado'});
			}else{
				console.log(equipoRemoved);
				res.status(200).send({equipo:equipoRemoved});
			}
		}
	});


}


module.exports = {
	getEquipo,
	getEquipos,
	saveEquipo,
	updateEquipo,
	deleteEquipo
}