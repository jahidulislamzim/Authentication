const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userControllers');
const {userRegistration , userLogin, updatePassword, loggedUser, forgotPassword, resetPassword, otpVerificationForEmail, resendOTPcode, testCookies} = UserController;

const checkUserAuth = require('../middlewares/auth-middleware');

//Route level Middleware - to protect route
router.use('/update-password', checkUserAuth);
router.use('/user-details', checkUserAuth);



//public routes for registretion , login and forget password
router.post('/register', userRegistration);
router.post('/login', userLogin);

router.post('/forgot-password', forgotPassword)


//daynamic route for reset password
router.put('/reset-password/:id/verify/:token', resetPassword);

//route for resend OTP
router.put('/resendOTP', resendOTPcode);

//daynamic route for email verification
router.post('/account-verification/:id/verify/:token/:email', otpVerificationForEmail)
router.post('/setCookies', testCookies)

//Protected Route for change password
router.put('/update-password', updatePassword);

//Protected Route for user Details 
router.get('/user-details', loggedUser)



module.exports = router;