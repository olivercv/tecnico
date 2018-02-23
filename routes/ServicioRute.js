'use strict'

var express = require('express');
var ServicioController = require('../controllers/ServicioController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/servicio/:id', md_auth.ensureAuth, ServicioController.getServicio);
api.post('/servicio', md_auth.ensureAuth, ServicioController.saveServicio);
api.get('/servicios/:page?', md_auth.ensureAuth, ServicioController.getServicios);
api.put('/servicio/:id', md_auth.ensureAuth, ServicioController.updateServicio);
api.delete('/servicio/:id', md_auth.ensureAuth, ServicioController.deleteServicio);

module.exports = api;