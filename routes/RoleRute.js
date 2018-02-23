'use strict'

var express = require('express');
var RoleController = require('../controllers/RoleController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/role/:id', md_auth.ensureAuth, RoleController.getRole);
api.post('/role', md_auth.ensureAuth, RoleController.saveRole);
api.get('/roles/:page?', md_auth.ensureAuth, RoleController.getRoles);
api.put('/role/:id', md_auth.ensureAuth, RoleController.updateRole);
api.delete('/role/:id', md_auth.ensureAuth, RoleController.deleteRole);


module.exports = api;