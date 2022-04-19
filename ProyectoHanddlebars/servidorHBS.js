// Se importó "productosLista" con articulos del desafio anterior para probar los endpoints y el array de productos
import productosLista from './productos.js';
import express from 'express';
import exphbs from 'express-handlebars';
import random from 'random';

const app = express();
let productos = [];

app.engine('handlebars', exphbs.engine()); 
app.use(express.static('public'));

app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//-----------------------GET-----------------------

app.get('/', (req, res) => {
  //Del array de productos del desafio anterior guardo uno para meterlo
  //como VALUE predefinido en el formulario para una demostracion rapida de las paginas

  let ejemploDeProducto = productosLista[random.int(0, 2)];
  console.log('peticion GET');
  res.render('formulario', { ejemploDeProducto });
});

app.get('/productos', (req, res) => {
  console.log('peticion GET');
  res.render('productos', { arrayProductos: productos });
});

//----------------------POST-----------------------

app.post('/productos', (req, res) => {
  const prodAgregado = req.body;
  prodAgregado.id = productos.length + 1;
  productos.push(prodAgregado);
  res.redirect('/');
  console.log('peticion POST');
});

//--------------------------------------------------------------
//             SERVER LISTEN

const server = app.listen(8080, () => {
  console.log(`Escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) =>
  console.log(`El error fue el siguiente ${error}`),
);
