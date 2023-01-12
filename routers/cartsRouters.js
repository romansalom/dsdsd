const express = require("express");
const routerCarts = express.Router();
const fs = require("fs");
const todoslosproductos = JSON.parse(fs.readFileSync("./json/productos.json"))
let carrito = [ ]; 
carrito.push(...todoslosproductos)

routerCarts.get("/carts", async (req, res) => {
  res.send(carrito);
  res.send("Carrito creado");
});

routerCarts.post("/productos", (req, res) => {
 const nuevoproducto = req.body;
 carrito.push(nuevoproducto);
 fs.writeFileSync("./json/productos.json" , JSON.stringify(carrito),(err) => {throw new Error(err)})
 res.send("el objeto fue creado ")
    
});

routerCarts.post("/:cid/product/:pid", (req, res) => {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;
  // agregar el producto al carrito
});

module.exports = {
  routerCarts,
};