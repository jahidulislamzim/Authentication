const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userControllers');
const {userRegistration , userLogin, changeUserPassword, loggedUser, getResetPasswordLink, resetPassword} = UserController;

const checkUserAuth = require('../middlewares/auth-middleware');

//Route level Middleware - to protect route
router.use('/changepassword', checkUserAuth);
router.use('/details', checkUserAuth);



//public routes for registretion , login and forget password
router.post('/register', userRegistration);
router.post('/login', userLogin);
router.post('/forgotpassword', getResetPasswordLink)


//

router.put('/resetpassword/:id/:token', resetPassword)

//Protected Route for change password
router.put('/changepassword', changeUserPassword);

//Protected Route for user Details 
router.get('/details', loggedUser)



module.exports = router;