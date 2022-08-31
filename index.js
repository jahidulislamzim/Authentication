const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./configs/connectdb');
const userRoutes = require('./routes/userRouter');



const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

//CORS Policy
app.use(
  cors({
    origin: 'https://authzee.netlify.app',
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://authzee.netlify.app')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})


// app.use((req, res, next) => {
//   res.header(
//     'Access-Control-Allow-Origin',
//     'http://localhost:3000'
//   );
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header(
//     'Access-Control-Allow-Methods',
//     'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
//   );
//   res.header(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
//   );
//   next();
// });

//Database Connection
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jg5bl.mongodb.net/?retryWrites=true&w=majority`;
const uri = 'mongodb://0.0.0.0:27017/'
connectDB(uri)

//JSON 
app.use(express.json());


//Load Routes 
app.use('/api/user', userRoutes);


app.get("/", (req, res) => {
    res.send("Authzee Server Is Running");
  });

app.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})