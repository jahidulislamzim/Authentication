const {Schema, model} = require('mongoose');

//Defining Temp User Schema
const tempUserSchema = new Schema({
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
    password:{
        type:String,
        required: true,
        trim: true
    },
    tc:{
        type:Boolean,
        required: true
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
    isVerified:{
        type:Boolean,
        required: true,
        default:false
    },
    createdAt:{
        type: Date, 
        default: Date.now,
        expires:610 //10 minutes
    }
    
}, { versionKey: false });

//Creating Temp User Model 
const TempUserModel = model("temp-users", tempUserSchema);

module.exports = TempUserModel;