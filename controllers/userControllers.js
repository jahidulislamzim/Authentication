const UserModel = require('../models/User');
const TempUserModel = require('../models/tempUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto');
const emailVerification = require('../configs/accountVerify');
const TempOTPModel = require('../models/tempOTP');

dotenv.config();

//User Regintration Function 
const userRegistration = async (req, res) => {
    const { name, email, password, confirmPassword, tc } = req.body;
    console.log(req.body)

    //Check if account with such email address already registered
    const user = await UserModel.findOne({ email: email });
    if (user) {
        res.send({ "status": "failed", "message": "Email Already Registred" });
    } else {
        //validdation input fields
        if (name && email && password && confirmPassword) {
            if (password === confirmPassword) {
                //Check If account in temp user
                const tempUser = await TempUserModel.findOne({email:email});
                if(tempUser){
                    res.send({ "status": "failed", "message": "Email Registred Recently" });
                }else{
                    try {

                        // Hashing Password 
                        const salt = await bcrypt.genSalt(12);
                        const hashPassword = await bcrypt.hash(password, salt);
    
                        // Function to generate OTP
                        function generateOTP() {
    
                            // Declare a digits variable 
                            // which stores all digits
                            var digits = '0123456789';
                            let OTP = '';
                            for (let i = 0; i < 6; i++ ) {
                                OTP += digits[Math.floor(Math.random() * 10)];
                            }
                            return OTP;
                        }
    
                        const OTP = generateOTP();

                        //Generate Crypto Message
                        const token = crypto.randomBytes(32).toString('hex');
    
                        //Save Data in temp DataBase
                        const document = new TempUserModel({
                            name: name,
                            email: email,
                            password: hashPassword,
                            // tc: tc,
                            OTP: OTP,
                            token: token
                        })
                        await document.save();

                        
                        
                        // Send Email OTP Code
                        // const info = await emailVerification(email, name, OTP)
                       

    
                        // get new registered use
                        const savedUser = await TempUserModel.findOne({ email: email });


                        //Creating link for verification
                        const link = `/user/account-verification/${savedUser._id}/verify/${savedUser.token}/${email}`

                        
                        res.send({ "status": "Pending", "message": "OTP Send Your Email", "link":link, 'OTP': OTP})

                    } catch (error) {
                        res.send({ "status": "failed", "message": "Unable to register"})
                    }
                }
             
            } else {
                res.send({ "status": "failed", "message": "Password and Confirm Password dosen't match" });
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" });
        }
    }

}



//OTP Verification Function
const otpVerificationForEmail = async(req, res) =>{
    const { otp } = req.body;
    const { id, token, email } = req.params;

    
    if(id && token && email){
        const user = await TempUserModel.findOne({email:email});
        
        if(user){

            if((user._id.toString() === id) && (user.token === token)){
               if(otp){
                if(otp===Number(user.OTP)){
                    
                    const document = new UserModel({
                        name:user.name,
                        email:user.email,
                        password:user.password,
                        tc:user.tc
                    })

                    await document.save();

                    await TempUserModel.findOneAndDelete({email:email})

                    res.cookie('jwt', token);

                    res.send({ "status": "Success", "message": "Account Verification Successful"})

                }else{
                    res.send({ "status": "failed", "message": "OTP Dont match"});
                }
               }else{
                res.send({ "status": "failed", "message": "Please Enter Your OTP"});
               }
            }else{
                res.send({ "status": "failed", "message": "inviled link"});
            }
        }else{
            res.send({ "status": "failed", "message": "inviled link" });
        }       
    }else{
        res.send({ "status": "failed", "message": "inviled link" });
    }
}



//Resend OTP code
const resendOTPcode = async(req, res) =>{
    const {id, token, email} = req.body;

    if(id && token && email){
        //Find otp data from two collection 
        const tempUser = await TempUserModel.findOne({email:email});
        const tempOTP = await TempOTPModel.findOne({email:email});

        if(tempUser){
            res.send({ "status": "success", "message": "It's Temp User" });
        }
        else if(tempOTP){
            res.send({ "status": "success", "message": "It's Temp OTP" });
        }else{
            res.send({ "status": "failed", "message": "Something is wrong" });
        }   
    }else{
        res.send({ "status": "failed", "message": "Something is wrong" });
    }
    


}





//User Login Function 
async function userLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await UserModel.findOne({ email: email });

            if (user !== null) {
                //compare password in database and user input
                const isMatchPassword = await bcrypt.compare(password, user.password);
                if (isMatchPassword) {
                    //Generate JWT Token 
                    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
                    res.send({ "status": "success", "message": "Login Successful!", "token": token });
                } else {
                    res.send({ "status": "failed", "message": "Email or Password is not valid" });
                }

            } else {
                res.send({ "status": "failed", "message": "You are not registered user" });
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" });
        }
    } catch (error) {
        console.log(error);
    }
}


//Update User Password 
const updatePassword = async (req, res) => {
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



//Get User Details
const loggedUser = async (req, res) => {
    res.send({ "user": res.user })
}





//Forgot Password Link
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (email) {

        const mailformat = /^[^]+@[^ ]+\.[a-z]{2,63}$/;

        if(email.match(mailformat)){

            //Find user from database
            const user = await UserModel.findOne({ email: email});

            if (user) {
                //Generate New Secret Key for update password 
                const secret = user._id + process.env.JWT_SECRET_KEY;
                //Generate jwt token for link it's valid only 10 minutes
                const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '10m' });
                 // Function to generate OTP
                 function generateOTP() {
    
                    // Declare a digits variable 
                    // which stores all digits
                    var digits = '0123456789';
                    let OTP = '';
                    for (let i = 0; i < 6; i++ ) {
                        OTP += digits[Math.floor(Math.random() * 10)];
                    }
                    return OTP;
                }

                const OTP = generateOTP();


                const document = new TempOTPModel({
                    name:user.name,
                    email:user.email,
                    OTP: OTP,
                    token:token,
                })

                await document.save();

                const getOTPData = await  TempOTPModel.findOne({email:email});





                //Generate Password Reset Link
                const link = `http://localhost:8080/api/user/reset-password/${getOTPData._id}/verify/${token}?email=${email}`;




                res.send({ "status": "success", "message": "OTP Sent your Email. Please Check Your Email", "OTP": OTP, "info": link })

            } else {
                res.send({ "status": "failed", "message": "Email doesn't exists" })
            }
        }else{
                res.send({ "status": "failed", "message": "Please input valid Email Formate!" })
        }
    } else {
        res.send({ "status": "failed", "message": "Email is required" })
    }
}






//Reset Password 
const resetPassword = async (req, res) => {
    const { password, password_confiramation } = req.body;
    const { id, token } = req.params;

    //find user from database
    const user = await UserModel.findOne({ _id: id });

    //create new secret key
    const secret = user._id + process.env.JWT_SECRET_KEY;

    try {
        jwt.verify(token, secret);
        if (password && password_confiramation) {
            if (password !== password_confiramation) {
                res.send({ "status": "failed", "message": "Password and Confirm Password dosen't match" })
            } else {
                //hashing password
                const salt = await bcrypt.genSalt(12);
                const hashPassword = await bcrypt.hash(password, salt);

                await UserModel.findByIdAndUpdate(user._id, {
                    $set: {
                        password: hashPassword
                    }
                })

                res.send({ "status": "success", "message": "Password Reset Successfully" })
            }

        } else {
            res.send({ "status": "failed", "message": "All fields are required" })
        }
    } catch (error) {
        res.send({ "status": "failed", "message": "Invalid Link" })
    }

}

const testCookies = async (req, res) =>{
    res.cookie('None', 'External', { sameSite: 'none', secure: true })
    // res.cookie('Lax', 'External', { sameSite: 'lax', secure: true})
    // res.cookie('Strict', 'External', { sameSite: 'strict', secure: true })
    res.send('External cookies set.')
}


module.exports = { userRegistration, userLogin, updatePassword, loggedUser, forgotPassword, resetPassword, otpVerificationForEmail,resendOTPcode, testCookies };
