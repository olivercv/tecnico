'use strict'

var express = require('express');
var TipoController = require('../controllers/TipoController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/tipo/:id', md_auth.ensureAuth, TipoController.getTipo);
api.post('/tipo', md_auth.ensureAuth, TipoController.saveTipo);
api.get('/tipos/:page?', md_auth.ensureAuth, TipoController.getTipos);
api.get('/tipostotal/:page?', md_auth.ensureAuth, TipoController.getTiposTotal);
api.put('/tipo/:id', md_auth.ensureAuth, TipoController.updateTipo);
api.delete('/tipo/:id', md_auth.ensureAuth, TipoController.deleteTipo);


module.exports = api;