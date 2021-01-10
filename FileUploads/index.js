// Necesitamos agregar un puerto de entrada "Acceso"

const PORT = process.env.PORT || 3000;

// Aquí agregaremos las librerias a utilizar "las invocamos"
const express = require('express'); // la palabra require lo unico que hace es requerir la libreria
// como la variable express es una libreria la creo como una clase para poder utlizar sus metodos y funciones
const app = express();
// path nos ayudara a saber donde sera la ruta de guardado
const path = require('path');
// Nos ayudara a gestionar los ficheros seleccionados 
const multer = require('multer')

// Lo que se esta haciendo aquí es decir donde estara nuestro storage de alamacenamiento de archivos
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //console.log("destino entro")
        cb(null, './Files_Node')
    },
    // Aqui es que cada vez que se suba algo , este le asigne un nombre y recuerden que no tiene que repetir 
    filename: (req, file, cb) => {
        //console.log("filename entro",file)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

// storage es la variable que contiene las propiedades y lo que hacemos aquí es asignarla a multer 
// para que ella trabaja en los ficheros 
const subir = multer({ storage });


//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.get('/', (req, res) => {
    return res.send('Hola mundo')
})

//
app.post('/subir', subir.single('file'), (req, res) => {
    //console.log(req.hostname);
    //console.log("file: ",req.file);
    //console.log("path ",req.path);
    return res.send(req.file)
})

//
app.listen(PORT, () => console.log('servidor activo: ' + PORT));