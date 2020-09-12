/*
    Path: /api/mensajes
*/

const { Router } = require('express');
const { getChat } = require('../controller/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:de',validarJWT, getChat);

module.exports = router;