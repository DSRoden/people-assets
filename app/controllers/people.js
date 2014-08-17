'use strict';

var People = require('../models/person');

exports.index = function(req, res){
  People.all(function(err, people){
    res.render('people/index', {people:people});
  });
};

exports.init = function(req, res){
  res.render('people/init');
};

exports.create = function(req, res){
  People.create(req.body, function(){
    res.redirect('/people');
  });
};

exports.show = function(req,res){
  People.findById(req.params.id, function(person){
    res.render('people/show', {person: person});
  });
};

exports.newAsset = function(req, res){
  res.render('people/newasset', {id:req.params.id});
};

exports.addAsset = function(req, res){
  People.findById(req.params.id, function(person){
    person.addAsset(req.body);
    person.save(function(){
      res.render('people/show', {person:person});
    });
  });
};

exports.destroy = function(req, res){
  People.removeById(req.params.id, function(){
    res.send({id:req.params.id});
  });
};
