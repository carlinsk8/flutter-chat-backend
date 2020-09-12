const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioUpdateOnline, grabarMensaje } = require('../controller/socket');
//Mensajes de sockets
io.on('connection', client => {
    
    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])

    // Verificar autenticación
    if (!valido) { return client.disconnect(); }

    // Cliente Autenticado
    usuarioUpdateOnline(uid, true);

    // Escuchar del  cliente mensaje-personal
    client.on('mensaje-personal', async (payload) => {
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal',payload)
    });

    // Ingresar al usuario a una sala en particular
    // sala global, client.id, id
    client.join(uid);

    client.on('disconnect', () => {
        usuarioUpdateOnline(uid, false);
    });

    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje ',payload);
    //     io.emit('mensaje',{admin: 'nuevo mensaje'})
    // });
});