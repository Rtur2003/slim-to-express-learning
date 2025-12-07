const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const validation = require('../middleware/validation');

const handle = (fn) => (req, res, next) => {
  try {
    return fn(req, res, next);
  } catch (err) {
    return next(err);
  }
};

router.post('/register', validation.validateRegistration, handle(usersController.register));
router.post('/login', validation.validateLogin, handle(usersController.login));

module.exports = router;
