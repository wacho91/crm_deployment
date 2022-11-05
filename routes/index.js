const express = require('express');
const router = express.Router();

const clienteController = require('../controller/clienteController');
const productosController = require('../controller/productosController');
const pedidosController = require('../controller/pedidosController');
const usuariosContorller = require('../controller/UsuariosContorller');

//Middleware para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function() {

    /*Clientes*/

    //Agrega nuevos clientes via POST
    router.post('/clientes', 
        auth,
        clienteController.nuevoCliente
    )

    //Obtener todos los clientes
    router.get('/clientes', 
        auth,
        clienteController.mostrarClientes
    )

    //Muestra un cliente en especifico (ID)
    router.get('/clientes/:idCliente',
        auth, 
        clienteController.mostrarCliente
    )

    //Actualizar un cliente
    router.put('/clientes/:idCliente', 
        auth,
        clienteController.actualizarCliente
    )

    //Eliminar Cliente
    router.delete('/clientes/:idCliente', 
        auth,
        clienteController.eliminarCliente
    );

    /*Productos*/

    //Crear nuevosproductos
    router.post('/productos', 
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto
    )

    //Muestra todos los productos
    router.get('/productos', 
        auth,
        productosController.mostrarProductos
    )

    //Miuestra un producto en especifico(ID)
    router.get('/productos/:idProducto', 
        auth,
        productosController.mostrarProducto
    )

    //Actualizar un producto
    router.put('/productos/:idProducto',
        auth, 
        productosController.subirArchivo,
        productosController.actualizarProducto
    )

    //Eliminar Producto
    router.delete('/productos/:idProducto', 
        auth,
        productosController.eliminarProducto
    );

    //Busqueda de productos
    router.post('/productos/busqueda/:query', 
        auth,
        productosController.buscarProducto
    );

    /*Pedidos*/

    //Agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', 
        pedidosController.nuevoPedido
    );

    //Muestra los pedidos
    router.get('/pedidos', 
        pedidosController.mostrarPedidos
    );

    //Mostrar un pedido por su (ID)
    router.get('/pedidos/:idPedido', 
        pedidosController.mostrarPedido
    );

    //Actualizar pedido
    router.put('/pedidos/:idPedido', 
        pedidosController.actualizarPedido
    );

    //Eliminar un pedido
    router.delete('/pedidos/:idPedido', 
        pedidosController.eliminarPedido
    );

    //Usuarios
    router.post('/crear-cuenta',
        auth,
        usuariosContorller.registrarUsuario
    )

    router.post('/iniciar-sesion',
        
        usuariosContorller.autenticarUsuario
    )


    return router;
}