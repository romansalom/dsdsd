const express = require("express");
const routerCarts = express.Router();
const fs = require("fs");
const { v4: uuidv4} = require('uuid');
const {products} = require('./productsRouters')


let productosenelcarro = JSON.parse(fs.readFileSync("./productos.json" , 'utf-8'))


const carritos = [];
const productosCarrito = [];


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
       productosCarrito: [],
        id: uuidv4()
    })

    
    fs.writeFileSync("./carrito.json" , JSON.stringify(carritos),(err)=>{
    
        
    
       
        throw new Error(err)
        
    })
    res.send('producto agregado', )
    
    });
   

    routerCarts.get('/:cid' ,(req,res)=>{
        let {cid} = req.params;
        const carrito = carritos.find(c => c.id === cid);
        res.send(carrito) 
    })
    routerCarts.post('/:cid/products/:pid' , (req,res) => {

        const {cid} = req.params;

        const idCart = carritos.find((c => c.id ===+cid ));

        const carroid = idCart.carritos

        res.send(idCart)

        const {pid} = req.params;
        const idProduct  = productosCarrito.find((p => p.id === +pid ));
    })

    module.exports =
    routerCarts;