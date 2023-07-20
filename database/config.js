const mongoose = require('mongoose');

const dbConnection = async() =>{
    try {
       await mongoose.connect(process.env.DB_CONNECTION);
       console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('There was an error with DB')
    }
}

module.exports ={
    dbConnection
}