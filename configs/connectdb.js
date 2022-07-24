const mongoose = require('mongoose');


const connectDB = async (DATABASE_URL) =>{
    try{

        const DB_OPTIONS = {
            dbName: 'authentication'
        }

        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log('DataBase Connection Successfull');

    }catch(error){
        console.log(error);
    }
}


module.exports = connectDB;