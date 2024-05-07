const express = require('express');
const router = express.Router();
const homeRouter = require('../web/routes/homeRouter');
const studentsRouter = require('../web/routes/studentsRouter');
const usersRouter = require('../web/routes/usersRouter');
const educationsRouter = require('../web/routes/educationsRouter');
const isAuthenticated = require('../middlewares/isAuthenticated');


router.use('/', homeRouter);
router.use('/students', isAuthenticated, studentsRouter);
router.use('/users', isAuthenticated, usersRouter);
router.use('/educations', isAuthenticated, educationsRouter);

module.exports = router;