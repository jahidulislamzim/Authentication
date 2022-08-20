const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./configs/connectdb');
const userRoutes = require('./routes/userRouter');



const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

//CORS Policy
app.use(cors());

//Database Connection
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jg5bl.mongodb.net/?retryWrites=true&w=majority`;
const uri = 'mongodb://0.0.0.0:27017/'
connectDB(uri)

//JSON 
app.use(express.json());


//Load Routes 
app.use('/api/user', userRoutes);




app.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})