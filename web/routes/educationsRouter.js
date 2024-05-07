const express = require('express');
const router = express.Router();
const csrf = require('../middlewares/csrf');
const educationsController = require('../controllers/educationsController');

router.get('/', educationsController.index);
router.get('/create', educationsController.createForm);
router.post('/', educationsController.create);
router.get('/:id/students', educationsController.students);
router.get('/:id/edit', educationsController.editForm);
router.patch('/:id', educationsController.update);
router.delete('/:id', csrf, educationsController.delete);

module.exports = router;