const { response } = require("express");
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) =>{
    const uid  = req.uid;
    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.hasta) || 20;
    const usuarios = await Usuario
        .find({_id: { $ne: uid }})
        .sort('-online')
        .skip(desde)
        .limit(hasta);

    //Generar JWT
    //const token = await generarJWT (uid);

    res.json({
        ok:true,
        usuarios,
        desde,
        hasta
    });
}

module.exports = {
    getUsuarios
}