const express = require('express');
const router = express.Router();
const educationController = require('../api/controllers/educationController');

router.get('/', educationController.get);
router.post('/', educationController.create);
router.get('/:id', educationController.getById);
router.patch('/:id', educationController.update);
router.delete('/:id', educationController.delete);

module.exports = router;