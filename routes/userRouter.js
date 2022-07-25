const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userControllers');
const {userRegistration , userLogin, changeUserPassword} = UserController;

const checkUserAuth = require('../middlewares/auth-middleware');

//Route level Middleware - to protect route
router.use('/changepassword', checkUserAuth)



//public routes
router.post('/register', userRegistration);
router.post('/login', userLogin);


//Protected Route
router.post('/changepassword', changeUserPassword)

module.exports = router;