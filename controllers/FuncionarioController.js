'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');


var Unidad = require('../models/unidad');
var Equipo = require('../models/equipo');
var Funcionario = require('../models/funcionario');


function getFuncionario(req, res){

	var funcionarioId = req.params.id;

	Funcionario.findById(funcionarioId, (err, funcionario) =>{
		if (err) {
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!funcionario) {
				res.status(404).send({message:'El funcionario no existe'});
			}else{
				res.status(200).send({funcionario});
			}
		}
	});

	
}

function getFuncionarios(req, res){

	if (req.params.page) {
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerpage = 3;

	Funcionario.find().sort('apellidos').paginate(page, itemsPerpage, function(err, funcionarios, total){
		if (err) {
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!funcionarios) {
				res.status(404).send({message:'No se encontraron funcionarios'});
			}else{
				return res.status(200).send({
					registros:total,
					funcionarios:funcionarios
				});
			}
		}
	});

}

function saveFuncionario(req, res){

	var funcionario = new Funcionario();

	var params = req.body;

	funcionario.nombres = params.nombres;
	funcionario.apellidos = params.apellidos;
	funcionario.ci = params.ci;
	funcionario.unidad = params.unidad;
	funcionario.coorporativo = params.coorporativo;
	funcionario.celular = params.celular;
	funcionario.interno = params.interno;
	funcionario.estado = params.estado;

	

	funcionario.save((err, funcionarioStored) => {
		if (err) {
			res.status(500).send({message:'Error al guardar el funcionario'});
		}else{
			if (!unidadStored) {
				res.status(404).send({message:'Los datos del funcionario no se guardaron'});
			}else{
				res.status(200).send({funcionario: funcionarioStored});
			}
		}
	});

}

function updateFuncionario(req, res){

	var funcionarioId = req.params.id;
	var update = req.body;

	Funcionario.findByIdAndUpdate(funcionarioId, update, (err, funcionarioUpdate) => {
		if (err) {
			res.status(500).send({message:'Error al actualizar el funcionario'});
		}else{
			if (!funcionarioUpdate) {
				res.status(404).send({message:'El funcionario ha sido actualizado'});
			}else{
				res.status(200).send({funcioanrio: funcionarioUpdate});
			}

		}
	});

}

function deleteFuncioanrio(req, res){
	var funcionarioId = req.params.id;
	//var update = req.body;

	Funcionario.findByIdAndRemove(funcionarioId, (err, funcionarioRemoved) => {
		if (err) {
			res.status(500).send({message:'Error al remover el funcioanrio'});
		}else{
			if (!funcionarioRemoved) {
				res.status(404).send({message:'El funcionario no ha sido eliminado'});
			}else{
				console.log(funcionarioRemoved);
				res.status(200).send({funcionario:funcionarioRemoved});
			}
		}
	});

}


module.exports = {
	getFuncionario,
	saveFuncionario,
	getFuncionarios,
	updateFuncionario,
	deleteFuncionario
}