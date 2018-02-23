'use strict'

var express = require('express');
var FuncionarioController = require('../controllers/FuncionarioController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/funcionario/:id', md_auth.ensureAuth, FuncionarioController.getFuncionario);
api.post('/funcionario', md_auth.ensureAuth, FuncionarioController.saveFuncionario);
api.get('/funcionarios/:page?', md_auth.ensureAuth, FuncionarioController.getFuncionario);
api.put('/funcionario/:id', md_auth.ensureAuth, FuncionarioController.updateFuncionario);
api.delete('/funcionario/:id', md_auth.ensureAuth, FuncionarioController.deleteFuncionario);

module.exports = api;