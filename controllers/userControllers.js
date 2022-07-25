const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//User Regintration Function 
const userRegistration = async (req, res) => {
    const { name, email, password, password_confiramation, tc } = req.body;

    //Check if account with such email address already registered
    const user = await UserModel.findOne({ email: email });
    if (user) {
        res.send({ "status": "failed", "message": "Email Already Registred" });
    } else {
        //validdation input fields
        if (name && email && password && password_confiramation && tc) {
            if (password === password_confiramation) {

                try {

                    // Hashing Password 
                    const salt = await bcrypt.genSalt(12);
                    const hashPassword = await bcrypt.hash(password, salt)

                    //Save Data in DataBase
                    const document = new UserModel({
                        name: name,
                        email: email,
                        password: hashPassword,
                        tc: tc
                    })

                    await document.save();

                    // get new registered user

                    const savedUser = await UserModel.findOne({ email: email });

                    //Generate JWT Token

                    const token = jwt.sign({ userID: savedUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

                    res.status(201).send({ "status": "success", "message": "User Registred Successful", "token": token })
                } catch (error) {
                    res.send({ "status": "failed", "message": "Unable to register" })
                }

            } else {
                res.send({ "status": "failed", "message": "Password and Confirm Password dosen't match" });
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" });
        }
    }

}


//User Login Function 
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await UserModel.findOne({ email: email });
            if (user != null) {
                //compare password in database and user input
                const isMatchPassword = await bcrypt.compare(password, user.password);
                if ((user.email === email) && isMatchPassword) {
                    //Generate JWT Token 
                    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
                    res.send({ "status": "success", "message": "Login Successful!", "token": token })
                } else {
                    res.send({ "status": "failed", "message": "Email or Password is not valid" })
                }

            } else {
                res.send({ "status": "failed", "message": "You are not registered user" })
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" })
        }
    } catch (error) {
        console.log(error)
    }
}


//Change User Password 
const changeUserPassword = async (req, res) => {
    const { current_password, new_password, password_confiramation } = req.body;
    if (current_password && new_password && password_confiramation) {
        //find user details from database
        const user = await UserModel.findOne({ email: req.user.email });
        //compare password user input and database
        const isMatchPassword = await bcrypt.compare(current_password, user.password)
        if (isMatchPassword) {
            if (new_password !== password_confiramation) {
                res.send({ "status": "failed", "message": "Password and Confirm Password dosen't match" })
            } else {
                // Hashing Password 
                const salt = await bcrypt.genSalt(12);
                const newHashPassword = await bcrypt.hash(new_password, salt);
                await UserModel.findByIdAndUpdate(req.user._id, {
                    $set: {
                        password: newHashPassword
                    }
                })
                res.send({ "status": "success", "message": "Password change Successful!" })
            }
        } else {
            res.send({ "status": "failed", "message": "current password dosen't match" })
        }

    } else {
        res.send({ "status": "failed", "message": "All fields are required" })
    }
}



module.exports = { userRegistration, userLogin, changeUserPassword };
