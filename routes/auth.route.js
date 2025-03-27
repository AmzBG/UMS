const express = require('express');
const { authenticationController, signOutController } = require('../controllers/auth.controller');
const authenticateValidation = require('../validation/auth.validator');
const authenticateToken = require('./middleware');

const router = express.Router();



router.post('/login', authenticateValidation, authenticationController);
router.get('/signout', authenticateToken, signOutController);



module.exports = router;