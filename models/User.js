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
        required: true
    }
}, { versionKey: false });


//Model
const UserModel = model("user", userSchema);

module.exports = UserModel;
