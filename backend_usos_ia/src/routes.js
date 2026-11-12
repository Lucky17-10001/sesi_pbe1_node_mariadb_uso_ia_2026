const express = require('express')
const router = express.Router()

const usuario = require('./controllers/usuario')
const usoia = require('./controllers/usoia')

router.post('/usuarios', usuario.cadastrar)
router.get('/usuarios', usuario.listar)
router.get('/usuarios/:id', usuario.buscarPorId)
router.put('/usuarios/:id', usuario.atualizar)
router.delete('/usuarios/:id', usuario.excluir)
router.post('/login', usuario.login)

router.post('/usoia', usoia.cadastrar)
router.get('/usoia', usoia.listar)
router.get('/usoia/:id', usoia.buscarPorId)
router.put('/usoia/:id', usoia.atualizar)
router.delete('/usoia/:id', usoia.excluir)
router.get('/usoia/resumo/riscos', usoia.resumoRiscos)

module.exports = router