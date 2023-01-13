
const express = require("express");
const routerProducts = express.Router();
const fs = require("fs");

const productos =[];

const todoslosProductos = JSON.parse(fs.readFileSync("./productos.json" , "utf8", (error)=>{
    throw Error(error)
}));

productos.push(...todoslosProductos);

routerProducts.get("/productos", async (req,res)=>{
    const limit = req.query.limit;
    if(limit) return res.send(productos.slice(0,limit))
    res.send(productos)
});

routerProducts.post("/productos" , async (req,res) =>{
    const nuevoProducto = req.body
    productos.push(nuevoProducto);
    fs.writeFileSync("./productos.json" , JSON.stringify(productos),(err)=>{
       
        throw new Error(err)
        
    })

    res.send("objeto creado ")
})

module.exports =
    routerProducts;
  