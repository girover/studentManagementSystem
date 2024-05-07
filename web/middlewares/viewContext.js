const educationService = require('../../core/services/educationService');
const crypto = require('crypto');
const urlGenerator = require('../../core/Http/urlGenerator');
const { model } = require('mongoose');

/**
 * ---------------------------------
 * request extending functions
 * 'this' refers to the request object
 * ---------------------------------
 */

function inputs(){
    return this.body;
}

function input(key){
    return this.body[key] ?? undefined;
}

function params(){
    return this.params;
}

function param(key){
    return this.params[key] ?? undefined;
}

function is(path){
    return this.path === path;
}

function isApi(){
    return this.path.includes('/api/');
}

function isWeb(){
    return !isApi();
}

function header(key){
    return this.get(key);
}

// store the inputs in the session object
function flash(){

    this.session.olds = {};

    // Copy each property from req.body to req.session.olds
    for (let key in this.body) {
        this.session.olds[key] = this.body[key];
    }
}

/**
 * ---------------------------------
 * response extending functions
 * 'this' refers to the response object
 * ---------------------------------
 */
function view(path, viewModel = {}){

    //this.locals.model = {};
    if(Object.keys(viewModel).length == 0){
        viewModel = [];
    }
    this.locals.model = viewModel;
    // if(Object.keys(viewModel).length !== 0){
    //     this.locals.model = viewModel;
    //     this.render(path);
    //     return;
    // }

    this.render(path);    
    // this.render(path, viewModel);    
}

function title(title){
    this.locals.title = title;
    return this;
}

function withModel(viewModel){
    this.locals.model = viewModel;
    return this;
}

function attach(dataObject){

    this.locals = {...this.locals, ...dataObject};

    return this;
}

function back(data = {}){
    this.redirect(this.locals.url.back(data));
}

/**
 * ---------------------------------
 * response.locals extending functions for views
 * 'this' refers to the response object
 * ---------------------------------
 */

function asset(path){
    return this.locals.url.asset(path);
}

function action(...params){
    return this.locals.url.action(...params);
}

function errorsAny(){
    return this.locals.errors;
}

function old(key, defaultValue = null){
    return this.locals.olds[key] ?? defaultValue;
}

function method(method = 'POST'){
    return `
        <input type="hidden" name="_method" value="${method}">
    `;
}

module.exports = async function (req, res, next) {   

    
    // 'this' refers to the request object
    const flashMsg = function(message){
        if(!req.session.viewData){
            req.session.viewData = {};
        }
        req.session.viewData.flashMessage = message;
        
        return this;

    }.bind(req);

    // 'this' refers to the response object
    const flashMessage = function(message){
        flashMsg(message);
        return this;
    }.bind(res);

    // 'this' refers to the request object
    const csrfToken = function(){
        return this.session.csrf_token;
    }.bind(req);

    const csrf = function(){
        
        return `
            <input type="hidden" name="_csrf_token" value="${csrfToken()}">
        `;
    }.bind(res)

    // make viewContext object available in views
    res.locals.educations = (await educationService.getAll()).data;

    // make the url object available in views
    const url = new urlGenerator(req);
    req.back = url.back;
    req.flash = flash.bind(req);
    req.inputs = inputs.bind(req);
    req.input = input.bind(req);
    req.params = params.bind(req);
    req.param = param.bind(req);
    req.is = is.bind(req);
    req.header = header.bind(req);
    req.isApi = isApi.bind(req);
    req.isWeb = isWeb.bind(req);
    req.csrfToken = csrfToken.bind(req);
    
    // these are accessable in all route handlers
    res.view = view.bind(res);
    res.withModel = withModel.bind(res);
    res.attach = attach.bind(res);
    res.title = title.bind(res);
    res.back = back.bind(res);
    res.flashMessage = flashMessage;

    // these are accessable in views
    res.locals.url = url
    res.locals.title = null;
    res.locals.asset = asset.bind(res);
    res.locals.action = action.bind(res);
    res.locals.errorsAny = errorsAny.bind(res);
    res.locals.olds = [];
    res.locals.old = old.bind(res);
    res.locals.csrf = csrf.bind(res);
    res.locals.method = method.bind(res);
    res.locals.auth = req.session.user ?? {};

    // override the request method if the _method is present in the request body
    if(req.body._method){
        req.method = req.body._method.toUpperCase();
    }

    // make some data from previous request available in views
    if(req.session){

        if(req.session.viewData){
            res.locals = {...res.locals, ...req.session.viewData};
            delete req.session.viewData;
        }

        if(req.session.olds){
            res.locals.olds = req.session.olds;
            delete req.session.olds;
        }

        if(!req.session.csrf_token){
            req.session.csrf_token = crypto.randomBytes(32).toString('hex');
        }
    }

    req.flash();
    
    next();
}