/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    validarCampos
], crearUsuario);

router.post('/',[
    check('password','La contraseña es obligatorio').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    validarCampos
], login);

//validarJWT
router.get('/renew',validarJWT, renewToken);

module.exports = router;