
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

    const generadorID = () =>{
        let id = 1;

        const elUltimoElemento = productos[productos.length -1];
        
        if(elUltimoElemento){
            id = elUltimoElemento.id + 1}
        return id ;
    }

    const idGenerado = generadorID();

    const nuevoProducto = {...req.body, id:idGenerado};
    productos.push(nuevoProducto);
    fs.writeFileSync("./productos.json" , JSON.stringify(productos),(err)=>{
    
        
   
       
        throw new Error(err)
        
    })

    res.send("objeto creado ")
});



routerProducts.get('/productos/:pid' , (req,res)=>
{
    let {pid}=  req.params;

    const producto = productos.find(e => parseInt(e.id) === parseInt(pid));
    res.send(producto)
})

routerProducts.put("/:pid" , (req,res) =>{
    const {pid} = req.params;
    const productos = req.body;
    const index = productos.find(e => parseInt(e.id) === parseInt(pid));
    res.send(index);
    if(index){
        productos[index]={
            ...productos,
            id: pid,
        }
        res.send('producto actualizadp');
    }else{
        res.status(400).send("no hay producto con ese id");
    }

});

module.exports =
    routerProducts;
  