const express = require('express');
const router = express.Router();
const csrf = require('../middlewares/csrf');
const studentsController = require('../controllers/studentsController');

router.get('/', studentsController.index);
router.get('/create', studentsController.createForm);
router.post('/', studentsController.create);
router.get('/:id', studentsController.profile);
router.get('/:id/edit', studentsController.editForm);
router.patch('/:id', studentsController.update);
router.delete('/:id', csrf, studentsController.delete);

module.exports = router;