const {Schema, model} = require('mongoose');



//Defining Temp OTP Schema

const tempOTPSchema = new Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        trim: true
    },
    OTP:{
        type: String,
        required: true
    },
    token:{
        type:String,
        require:true,
        trim: true
    },
    createdAt:{
        type: Date, 
        default: Date.now,
        require:true,
        expires:610 //10 minutes
    } 
}, { versionKey: false});


//Create Temp OTP Model

const TempOTPModel = model("temp-otps", tempOTPSchema);

module.exports = TempOTPModel;