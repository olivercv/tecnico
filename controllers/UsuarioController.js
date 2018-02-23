'use strinct'

var fs = require('fs');
var path = require('path');

var bcrypt = require('bcrypt-nodejs');
var Usuario = require('../models/usuario');
var jwt = require('../services/jwt');


function pruebas(req, res){
	res.status(200).send({
		message:'Probando una accion del controlador de usuarios del Apirest de Nodo y Mongo'
	});

}

function getUsuario(req, res){
	
		var usuarioId = req.params.id;
	
		Usuario.findById(usuarioId, (err, usuario) =>{
			if (err) {
				res.status(500).send({message:'Error en la petición'});
			}else{
				if (!usuario) {
					res.status(404).send({message:'El usuario no existe'});
				}else{
					res.status(200).send({usuario});
				}
			}
		});
	
		
	}
	
	function getUsuarios(req, res){
	
		if (req.params.page) {
			var page = req.params.page;
		}else{
			var page = 1;
		}
	
		var itemsPerpage = 5;
	
		Usuario.find().sort('nombres').paginate(page, itemsPerpage, function(err, usuarios, total){
			if (err) {
				res.status(500).send({message:'Error en la petición'});
			}else{
				if (!usuarios) {
					res.status(404).send({message:'No hay usuarios'});
				}else{
					return res.status(200).send({
						registros:total,
						usuarios:usuarios
					});
				}
			}
		});
	
	}




function saveUsuario(req, res){
	var usuario = new Usuario;

	var params = req.body;

	console.log(params);

	usuario.nombres = params.nombres;
	usuario.apellidos = params.apellidos;
	usuario.usuario = params.usuario;
	usuario.email = params.email;
	usuario.role = params.role;
	usuario.image = 'null';
	usuario.estado = 1;


	if (params.password) {
		//encriptar contraseña y guardar datos

		bcrypt.hash(params.password, null, null, function(err, hash){
			usuario.password = hash;

			if(usuario.nombres != null && usuario.apellidos != null && usuario.usuario!=null && usuario.email!=null){
				//Guardar el usuario
				usuario.save((err, usuarioStored)=>{
					if (err) {
						console.log(err);
						res.status(500).send({message:'Error al guardar el usuario'});
					}else{
						if (!usuarioStored) {
							res.status(404).send({message:'No se ha registrado el usuario'});
						}else{
							res.status(200).send({usuario:usuarioStored}); //para que el obejto se visualice como usuario y no como usuariostored
						}
					}
				});

			}else{
				res.status(200).send({message:'Introduce todos los campos'});
			}

		});


	}else{
		res.status(500).send({message:'Introduce la contraseña'});
	}


}


function loginUsuario(req , res){
	//var usuario = new Usuario;

	var params = req.body;

	var email = params.email;
	var password = params.password;

	Usuario.findOne({email:email.toLowerCase()},(err,usuario)=>{
		if (err){
			res.status(500).send({message:'Error en la petición'});
		}else{
			if (!usuario) {
				res.status(404).send({message:'El usuario no existe'});	
			}else{

				bcrypt.compare(password, usuario.password, function(err, check){
					if (check) {
						//devolver datos del usuario logueado
						if (params.gethash) {
							//devolver un token de jwt
							res.status(200).send({
								token: jwt.createToken(usuario)
							});
						}else{
							res.status(200).send({usuario});
						}


					}else{
						res.status(404).send({message:'El usuario no ha podido loguearse'});	
					}
				});

			}
		}
	});



}

function updateUsuario(req, res){



	var usuarioId = req.params.id;
	var update = req.body;

	Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioUpdate) => {
		if (err) {
			res.status(500).send({message:'Error al actualizar el usuario'});
		}else{
			if (!usuarioUpdate) {
				res.status(404).send({message:'EL usuario no ha sido actualizado'});
			}else{
				res.status(200).send({usuario: usuarioUpdate});
			}

		}
	});



}

function uploadImage(req, res){
	var usuarioId = req.params.id;
	var file_name = 'No subio...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\/');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

			Usuario.findByIdAndUpdate(usuarioId, {image:file_name},(err, usuarioUpdated)=>{
				if (err) {
					res.status(404).send({message:'No se ha podido actualizar la imagen del usuario '});
				}else{
					res.status(200).send({image: file_name ,usuario:usuarioUpdated});
				}
			});

		}else{
			res.status(200).send({message:'Extencion del archivo no válida '});
		}

		//console.log(ext_split);


	}else{
		res.status(200).send({message:'No ha subido ninguna imagen.. '});
	}
}

function getImageFile(req, res){

	var imageFile = req.params.imageFile;
	var pathFile = './uploads/usuarios/'+imageFile;

	fs.exists(pathFile, function(exists){
		if (exists) {
			res.sendFile(path.resolve(pathFile));
		}else{
			res.status(200).send({message:'No existe la imagen.. '});
		}

	});

}

function deleteUsuario(req, res){
	var usuarioId = req.params.id;
	//var update = req.body;

	Usuario.findByIdAndRemove(usuarioId, (err, usuarioRemoved) => {
		if (err) {
			res.status(500).send({message:'Error al guardar el usuario'});
		}else{
			if (!usuarioRemoved) {
				res.status(404).send({message:'El usuario no ha sido eliminado'});
			}else{
				console.log(usuarioRemoved);
				res.status(200).send({usuario:usuarioRemoved});
			}
		}
	});


}

module.exports={
	pruebas,
	getUsuario,
	getUsuarios,
	saveUsuario,
	loginUsuario,
	updateUsuario,
	deleteUsuario,
	uploadImage,
	getImageFile
};