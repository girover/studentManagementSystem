const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.get);
router.post('/', usersController.create);
router.get('/:id', usersController.getById);
router.patch('/:id', usersController.update);
router.delete('/:id', usersController.delete);

module.exports = router;