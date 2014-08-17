'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    home           = require('../controllers/home'),
    people         = require('../controllers/people');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);
  app.get('/people', people.index);
  app.get('/people/new', people.init);
  app.post('/people', people.create);
  app.get('/people/:id', people.show);
  app.get('/people/:id/assets/new', people.newAsset);
  app.post('/people/:id/assets', people.addAsset);
  app.delete('/people/:id', people.destroy);
  console.log('Routes Loaded');
};

