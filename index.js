const express = require("express");
const app = express();
const productsRouters = require('./routers/productsRouters');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products',productsRouters);

const PORT = 4000;
app.listen(PORT, () => {
  console.log("servidor fuinciona");
});
