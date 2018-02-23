'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');


var Role = require('../models/role');


function getRole(req, res){

	var roleId = req.params.id;

	Role.findById(roleId, (err, role) =>{
		if (err) {
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!role) {
				res.status(404).send({message:'El rol no existe'});
			}else{
				res.status(200).send({role});
			}
		}
	});

	
}

function getRoles(req, res){

	if (req.params.page) {
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerpage = 5;

	Role.find().sort('descripcion').paginate(page, itemsPerpage, function(err, roles, total){
		if (err) {
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!roles) {
				res.status(404).send({message:'No hay roles'});
			}else{
				return res.status(200).send({
					registros:total,
					roles:roles
				});
			}
		}
	});

}

function saveRole(req, res){

	var role = new Role();

	var params = req.body;

	role.descripcion = params.descripcion;
	role.estado = params.estado;

	role.save((err, roleStored) => {
		if (err) {
			res.status(500).send({message:'Error al guardar el rol'});
		}else{
			if (!roleStored) {
				res.status(404).send({message:'El rol no ha sido guardado'});
			}else{
				res.status(200).send({role: roleStored});
			}
		}
	});

}

function updateRole(req, res){

	var roleId = req.params.id;
	var update = req.body;

	Role.findByIdAndUpdate(roleId, update, (err, roleUpdate) => {
		if (err) {
			res.status(500).send({message:'Error al guardar el rol'});
		}else{
			if (!roleUpdate) {
				res.status(404).send({message:'El rol no ha sido actualizado'});
			}else{
				res.status(200).send({role: roleUpdate});
			}

		}
	});

}

function deleteRole(req, res){
	var roleId = req.params.id;
	//var update = req.body;

	Role.findByIdAndRemove(roleId, (err, roleRemoved) => {
		if (err) {
			res.status(500).send({message:'Error al guardar el rol'});
		}else{
			if (!roleRemoved) {
				res.status(404).send({message:'El rol no ha sido eliminado'});
			}else{
				console.log(roleRemoved);
				res.status(200).send({role:roleRemoved});
			}
		}
	});


}


module.exports = {
	getRole,
	saveRole,
	getRoles,
	updateRole,
	deleteRole
}