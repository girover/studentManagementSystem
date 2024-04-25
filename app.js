const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const container = require('./middlewares/container');
const cors = require('./middlewares/cors');
const invalidPathHandler = require('./middlewares/invalidPathHandler');
const errorHandler = require('./middlewares/errorHandler');
const result = require('./middlewares/result');
const studentsRouter = require('./routers/studentsRouter');
const educationsRouter = require('./routers/educationsRouter');

const app = express();

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('dev'));     // log all requests to the console.
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());     // parse application/json
app.use(cors);          // add the CORS configuration to the request pipeline.
app.use(container);     // add the dependencies container middleware to the request pipeline.
app.use(result);        // add the result middleware to the request pipeline.

// Endpoints Routing
app.use('/students', studentsRouter); // add the students router to the request pipeline
app.use('/educations', educationsRouter); // add the educations router to the request pipeline
// ...............................................

app.use(invalidPathHandler); // add the not found handler to the request pipeline.
app.use(errorHandler); // add the error handler to the request pipeline.


module.exports = app;