const express = require('express');
const router = express.Router();
const studentsRouter = require('../api/routers/studentsRouter');
const educationsRouter = require('../api/routers/educationsRouter');
const usersRouter = require('../api/routers/usersRouter');

router.use('/students', studentsRouter);
router.use('/educations', educationsRouter);
router.use('/users', usersRouter);

module.exports = router;