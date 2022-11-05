const Productos = require('../models/Productos');

const fs = require('fs');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        }else {
            cb(new Error('Formato no Valido'))
        }
    }
}

//Pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');

//Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res,function(error) {
        if(error) {
            res.json({ mensaje : error })
        }
        return next()
    })
}

//Agrega nuevos productos
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if(req.file.filename) {producto.imagen = req.file.filename}
        await producto.save();
        res.json({ mensaje: 'Se agrego un nuevo producto'})
        
    } catch (error) {
        console.log(error);
        next()
    }
}

//Mostrar Productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next()
    }
}

//Mostrar producto en especifico(ID)
exports.mostrarProducto = async(req, res, next) => {

    try {
        const producto = await Productos.findById(req.params.idProducto);
        res.json(producto);
    } catch (error) {
        console.log(error)
        res.json({ mensaje : 'Ese producto no existe'});
        next()
    }
}

//Actualizar un producto
exports.actualizarProducto = async(req, res, next) => {
    try {

        //Contruir un nuevo producto
        let nuevoProducto = req.body;

        //Verificar si hay imagen nueva
        if(req.file) {
            nuevoProducto.imagen = req.file.filename
        } else {
            let producto1 = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = producto1.imagen
        }

        const producto = await Productos.findOneAndUpdate({ _id : req.params.idProducto},
        nuevoProducto, {
            new : true
        })
        res.json(producto);
    } catch (error) {
        console.log(error)
        next();
    }
}

//Eliminar Productos especifico
exports.eliminarProducto = async (req, res, next) => {
    
    try {
      const producto =   await Productos.findOneAndDelete({ _id : req.params.idProducto});
      //Si hay una imagen eliminarla
      if(producto.imagen) {
        const imagenAnteriorPath = __dirname + `/../uploads/${producto.imagen}`;
        // eliminar archivo con filesystem
        fs.unlink(imagenAnteriorPath, (error) => {
            if(error) {
                console.log(error)
            }
            return;
        });
      }
        res.json({ mensaje : 'El prdoducto ha sido eliminado'});
    } catch (error) {
        res.json({ mensaje:'No existe ese Producto'});
        console.log(error)
        next();
    }
}

//Busqueda de productos
exports.buscarProducto = async (req, res, next) => {
    try {
        //Obtener la query
        const { query } = req.params
        const producto = await Productos.find({ nombre : new RegExp(query, 'i') });
        res.json(producto);
    } catch (error) {
        console.log(error)
        next()
    }
}