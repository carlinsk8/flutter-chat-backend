const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioUpdateOnline = async (uid = '', value = Boolean) => {

    const usuario  = await Usuario.findById(uid);
    usuario.online = value;

    await usuario.save();

    return usuario;

}

const grabarMensaje = async(payload) => {

    // {
    //     de:'',
    //     para: '',
    //     mensaje: ''
    // }

    try {
        const mensaje =  new Mensaje( payload );
        await mensaje.save();
        return true
    } catch (error) {
        return false
    }
}

module.exports = {
    usuarioUpdateOnline,
    grabarMensaje
}