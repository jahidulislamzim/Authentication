const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userControllers');
const {userRegistration , userLogin} = UserController;



router.post('/register', userRegistration);
router.post('/login', userLogin);


module.exports = router;