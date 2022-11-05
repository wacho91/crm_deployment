const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async(req, res, next) => {
    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();
        res.json({ mensaje: 'Se agrego un nuevo pedido'})
    } catch (error) {
        console.log(error);
        next();
    }
}

//Muestra los pedidos
exports.mostrarPedidos = async(req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path : 'pedido.producto',
            model: 'Productos'
        })

        res.json(pedidos);
    } catch (error) {
        console.log(error)
        next()
    }
}

//Mostrar pedido por su (ID)
exports.mostrarPedido = async(req, res, next) => {

    try {
        const pedido = await Pedidos.findById( req.params.idPedido).populate('cliente').populate({
            path : 'pedido.producto',
            model: 'Productos'
        })
        res.json(pedido);
    } catch (error) {
        console.log(error);
        res.json({ mensaje : 'Ese pedido no existe'})
        next();
    }
}

//Actualizar un pedido
exports.actualizarPedido = async(req, res, next) => {
    try {
        const pedido = await Pedidos.findOneAndUpdate({_id : req.params.idPedido},
        req.body, {
            new : true
        }).populate('cliente').populate({
            path : 'pedido.producto',
            model: 'Productos'
        })
        res.json(pedido)
    } catch (error) {
        console.log(error);
        next()
    }
}

//Eliminar un pedido
exports.eliminarPedido = async(req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({ _id : req.params.idPedido})
        res.json({ mensaje : 'El pedido ha sido Eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}