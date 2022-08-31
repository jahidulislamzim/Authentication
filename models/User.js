const {Schema, model} = require('mongoose');


//Defining Users Schema
const userSchema = new Schema({
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
        required:false
    },
    isVerified:{
        type:Boolean,
        required: true,
        default:true
    },
}, { versionKey: false });


//Note: { versionKey: false } for remove __v (version number) from database;

//Note: tc meaning Terms & Conditions

//Model
const UserModel = model("user", userSchema);

module.exports = UserModel;
