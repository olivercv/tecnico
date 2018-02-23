'use strict'

var express = require('express');
var UnidadController = require('../controllers/UnidadController');
var TipoController = require('../controllers/TipoController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.get('/unidad/:id', md_auth.ensureAuth, UnidadController.getUnidad);
api.post('/unidad', md_auth.ensureAuth, UnidadController.saveUnidad);
api.get('/unidades/:page?', md_auth.ensureAuth, UnidadController.getUnidades);
api.put('/unidad/:id', md_auth.ensureAuth, UnidadController.updateUnidad);
api.delete('/unidad/:id', md_auth.ensureAuth, UnidadController.deleteUnidad);


module.exports = api;