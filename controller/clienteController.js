const Clientes = require('../models/Clientes');

//Agrega un nuevo cliente
exports.nuevoCliente = async(req, res, next) => {
    
    //Crear nuevo cliente
    const cliente = new Clientes(req.body);

    try {
        //Almacane el registro
        await cliente.save()
        res.json({mensaje : 'Se agrego un nuevo cliente'});
    } catch (error) {
        //Si hay un error, console.log y next
        res.json(error)
        next();
    }
}

//Muestra todo los clientes
exports.mostrarClientes = async (req, res, next) => {
 
    try {
        // Almacenar el registro
        const clientes= await Clientes.find({});
        res.json(clientes);
    } catch(error) {
        // si hay error 
        console.log(error);
        next();
    }
}

//Muestra un cliente en especifico (ID)
exports.mostrarCliente = async(req, res, next) => {

    try {
        const cliente = await Clientes.findById(req.params.idCliente);
        //Mostrar Clientes
        res.json(cliente);
    } catch (error) {
        console.log(error)
        res.json({mensaje : 'Ese cliente no existe'})
        next();
    }

}

//Actualizar un cliente
exports.actualizarCliente = async(req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente}, 
        req.body, {
            new : true
        });
        res.json(cliente)
    } catch (error) {
        res.send(error);
        next()
    }
}

//Eliminar un cliente
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findOneAndDelete({ _id : req.params.idCliente});
        res.json({ mensaje : 'El cliente ha sido eliminado'})
    } catch (error) {
        console.log(error);
        next();
    }
}