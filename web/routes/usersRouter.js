const express = require('express');
const router = express.Router();
const csrf = require('../middlewares/csrf');
const usersController = require('../controllers/usersController');

router.get('/', usersController.index);
router.get('/create', usersController.createForm);
router.post('/', usersController.create);
router.get('/:id', usersController.profile);
router.get('/:id/edit', usersController.editForm);
router.patch('/:id', usersController.update);
router.delete('/:id', csrf, usersController.delete);

module.exports = router;