const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userRegistration = async (req, res) =>{
    const {name, email, password, password_confiramation, tc} = req.body; 
    
    //Check if account with such email address already registered
    const user = await UserModel.findOne({email : email});
    if(user){
        res.send({"status":"failed", "message":"Email Already Registred"});
    }else{
        //validdation input fields
        if(name && email && password && password_confiramation && tc){
            if(password === password_confiramation){

                try{
                    
                // Hashing Password 
                const salt = await  bcrypt.genSalt(12);
                const hashPassword = await bcrypt.hash(password, salt)

                //Save Data in DataBase
                const document = new UserModel({
                    name:name,
                    email:email,
                    password:hashPassword,
                    tc:tc
                })

                await document.save();
                }catch(error){
                    res.send({"status":"failed", "message":"Unable to register"})
                }

            }else{
                res.send({"status":"failed", "message":"Password and Confirm Password dosen't match"});
            }
        }else{
            res.send({"status":"failed", "message":"All fields are required"});
        }
    }
    
}

module.exports = userRegistration;