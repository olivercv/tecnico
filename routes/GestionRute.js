'use strict'

var express = require('express');
var GestionController = require('../controllers/GestionController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/gestion/:id', md_auth.ensureAuth, GestionController.getGestion);
api.post('/gestion', md_auth.ensureAuth, GestionController.saveGestion);
api.get('/gestiones/:page?', md_auth.ensureAuth, GestionController.getGestiones);
api.get('/gestionestotal/:page?', md_auth.ensureAuth, GestionController.getGestionesTotal);
api.put('/gestion/:id', md_auth.ensureAuth, GestionController.updateGestion);
api.delete('/gestion/:id', md_auth.ensureAuth, GestionController.deleteGestion);


module.exports = api;