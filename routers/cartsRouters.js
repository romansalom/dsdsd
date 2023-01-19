const express = require("express");
const routerCarts = express.Router();
const fs = require("fs");
const { v4: uuidv4} = require('uuid');



const carritos = [];


const todosloscaarts = JSON.parse(fs.readFileSync("./carrito.json" , "utf8", (error)=>{
    throw Error(error)

}));
carritos.push(...todosloscaarts);

routerCarts.get('/',(req,res) =>{
    res.send(carritos)
});


routerCarts.post('/' , (req,res) =>{

    const carrito = req.body;
    carritos.push({
       ...carrito,
        id: uuidv4()
    })
    const nuevoCarrito = {...req.body, id:uuidv4()};
    carritos.push(nuevoCarrito);
    fs.writeFileSync("./carts.json" , JSON.stringify(carritos),(err)=>{
    
        
    
       
        throw new Error(err)
        
    })
    res.send('producto agregado')
    
    });
   
    

    module.exports =
    routerCarts;