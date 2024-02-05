// Ejemplo de uso de las rutas:
// http://localhost:8000 = Home, te voy a mostrar un mensajito
// http://localhost:8000/products = Te muestro el json de todos los productos
// http://localhost:8000/products?limit=1 = Te mustro solo el primer producto
// http://localhost:8000products/1 = Te muestro solo el producto con id 1 (o el id que le pongas)
import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const port = 8000; // Elegi el 8000 porque me cayo simpatico

const productManager = new ProductManager('productos.json');

app.get('/', (req, res) => {
    res.send("Hola, soy el primer servidor Express.js de Maxi Ripani");
})
app.get('/products', (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit));
  }

  res.json({ products });
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
