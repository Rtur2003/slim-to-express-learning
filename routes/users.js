const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const validation = require('../middleware/validation');
const asyncHandler = require('../middleware/asyncHandler');

router.post('/register', validation.validateRegistration, asyncHandler(usersController.register));
router.post('/login', validation.validateLogin, asyncHandler(usersController.login));

module.exports = router;
