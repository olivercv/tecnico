'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

var secret = 'clave_secreta_tecnico';

exports.createToken = function(usuario){

	var payload = {
		sub: usuario._id,
		name: usuario.nombres,
		lastname: usuario.apellidos,
		email: usuario.email,
		role: usuario.role,
		image: usuario.imagen,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	};

	return jwt.encode(payload, secret);
};