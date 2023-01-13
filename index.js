const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require("./routers/productsRouters.js"));

const PORT = 4000;
app.listen(PORT, () => {
  console.log("servidor fuinciona");
});
