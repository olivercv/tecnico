'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = Schema({
	descripcion: String,
	estado:Number
});

module.exports = mongoose.model('Role', RoleSchema);