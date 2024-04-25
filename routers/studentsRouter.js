const express = require('express');
const router = express.Router();
const studentsController = require('../api/controllers/studentsController');

router.get('/', studentsController.get);
router.post('/', studentsController.create);
router.get('/:id', studentsController.getById);
router.patch('/:id', studentsController.update);
router.delete('/:id', studentsController.delete);

module.exports = router;