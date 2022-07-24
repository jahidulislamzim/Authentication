const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userControllers');



router.post('/register', UserController);


module.exports = router;