const express = require("express");
require('dotenv').config()
const { dbConnection }= require('./database/config')
const cors = require('cors');
const app = express();

app.use( express.static('public') );

dbConnection();

app.use(cors());

app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'))


app.listen(process.env.PORT,()=>{
    console.log(`Server running at port ${process.env.PORT}`);
});