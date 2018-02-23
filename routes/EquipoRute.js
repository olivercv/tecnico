'use strict'

var express = require('express');
var EquipoController = require('../controllers/EquipoController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/equipo/:id', md_auth.ensureAuth, EquipoController.getEquipo);
api.post('/equipo', md_auth.ensureAuth, EquipoController.saveEquipo);
api.get('/equipos/:page?', md_auth.ensureAuth, EquipoController.getEquipos);
api.put('/equipo/:id', md_auth.ensureAuth, EquipoController.updateEquipo);
api.delete('/equipo/:id', md_auth.ensureAuth, EquipoController.deleteEquipo);

module.exports = api;