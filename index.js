const express = require('express');
const connnectDB = require('./conf/db')
const cors = require('cors');

const app = express();

//DB connection 
connnectDB();
app.use(cors());
app.use(express.json()); // co n esto se habilitan los json

app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/categorias', require('./routes/categorias.routes'));

app.listen(4000, ()=>{
    console.log('Server Online')
})