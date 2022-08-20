const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const checkUserAuth = async (req, res, next)=>{
    let token 
    const {authorization} = req.headers;

    if(authorization &&  authorization.startsWith('Bearer')){
        try{
            //Get token from header
            token = authorization.split(' ')[1];

            //Verify Token
            const  {userID} = jwt.verify(token, process.env.JWT_SECRET_KEY);

            //Get User From Token
            res.user = await UserModel.findById(userID).select('-password');

            next();
        }catch(error){
            res.status(401).send({"status":"failed", "message": "Unauthorized User"})
        }
    }

    if(!token){
         res.status(401).send({"status":"failed", "message": "Unauthorized User, no token"})
    }
}

module.exports = checkUserAuth;