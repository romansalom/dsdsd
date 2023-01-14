
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
//routerProducts.get('/productos/:id', async (req,res)=>{
 //   const id = req.query.id;


  //  res.send(productos.find(e =>parseInt(e.id) == ( req.//params.id)));
//});


routerProducts.get('/productos/:pid' , (req,res)=>
{
    let {pid}=  req.params;

    const producto = productos.find(e => e.id === pid);
    res.send(producto)
})

module.exports =
    routerProducts;
  