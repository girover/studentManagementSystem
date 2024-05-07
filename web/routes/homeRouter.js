const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const redirectIfAuthenticated = require('../../middlewares/redirectIfAuthenticated');

router.get('/',isAuthenticated, homeController.index);
router.get('/login', redirectIfAuthenticated, authController.loginForm);
router.post('/login', redirectIfAuthenticated, authController.login);
router.get('/logout', authController.logout);

module.exports = router;