const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const application = function(expressApp){

    this.app = expressApp;

    this.middlewares = [];

    /**
     * Initializes the view context.
     * add view context variables.
     */
    this.initViewContext = function(req, res, next){

        const url = require('./Http/urlGenerator');

        res.locals.viewContext = {
            pageTitle: 'Title of the page'
        };

        res.locals.url = new url(req);

        if(req.session.viewContext){
            Object.assign(res.locals, req.session.viewContext);
            delete req.session.viewContext;
        }

        next();
    };

    this.initSession = function(){
        this.app.use(session({
            secret: 'secret',
            resave: false,
            saveUninitialized: true,
        }));
    }

    this.init = function(){  
        this.initSession();
        this.app.use(this.initViewContext);
    };

    this.addMongoDB = function(){
        const mongoose = require('mongoose');
        mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    this.addBodyParser = function(){
        // this.app.use(bodyParser.urlencoded({ extended: false }));   // parse application/x-www-form-urlencoded
        // this.app.use(bodyParser.json());     // parse application/json

        this.middlewares.push(bodyParser.urlencoded({ extended: false }));
        this.middlewares.push(bodyParser.json());
    };

    this.addControllers = function(){

    };

    this.addViews = function(){
        //const partials = require('express-partials');
        // this.app.use(partials());
        const path = require('path');
        this.middlewares.push(express.static(path.join(__dirname, 'web/public')));
        this.app.set('view engine', 'ejs'); // set the view engine to ejs
        this.app.set('views', path.join(__dirname, 'web/views')); // set the views directory
        this.app.set('view options', {layout:'layout'}); // set the default layout

        this.middlewares.push(require('express-partials'));
    };

    this.addDataBag = function(){
        //const dataBag = require('./middlewares/dataBag');
        // this.app.use(dataBag);     // add the dataBag middleware to the request pipeline.
        this.middlewares.push(require('../middlewares/dataBag'));
    }

    this.addCors = function(){
        //const cors = require('./middlewares/cors');
        // this.app.use(cors); // add the CORS configuration to the request pipeline.
        this.middlewares.push(require('../middlewares/cors'));
    };

    this.addSession = function(){
        const session = require('express-session'); 
        
        this.middlewares.push(session({
            secret: 'secret',
            resave: false,
            saveUninitialized: true,
        }));

        this.middlewares.push(require('../middlewares/webSession'));
    };

    this.addApiControllers = function(){
        //const apiRouter = require('./routers/api');
        //this.app.use('/api', apiRouter);
        this.middlewares.push(require('../routers/api'));
    }

    this.addWebControllers = function(){
        this.middlewares.push(require('../web/middlewares/viewContext'), require('../routers/web'));
    }

    this.addInvalidPathHandler = function(){
        // const invalidPathHandler = require('./middlewares/invalidPathHandler');
        // this.app.use(invalidPathHandler); // add the invalid path handler to the request pipeline.
        this.middlewares.push(require('../middlewares/invalidPathHandler'));
    }

    this.addErrorHandler = function(){
        // const errorHandler = require('./middlewares/errorHandler');
        // this.app.use(errorHandler); // add the error handler to the request pipeline.
        this.middlewares.push(require('../middlewares/errorHandler'));
    }

    this.addConsoleLogger = function(){
        // const morgan = require('morgan');
        //app.use(morgan('dev'));     // log all requests to the console.
        this.middlewares.push(require('morgan')('dev'));
    }

    this.build = function(){

        this.init();
        
        this.middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }
}

module.exports = application;