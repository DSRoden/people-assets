'use strict';

var Mongo = require('mongodb'),
    _ = require('lodash');

function Person(o){
  this.name  = o.name;
  this.photo = o.photo;
  this.cash  = parseFloat(o.cash);
  this.assets = [];
}

Object.defineProperty(Person, 'collection', {
  get: function(){return global.mongodb.collection('people');}
});

Person.create = function(o, cb){
  var p = new Person(o);
  Person.collection.save(p, cb);
};

Person.all = function(cb){
  Person.collection.find().toArray(cb);
};

Person.findById = function(id,cb){
  var _id = Mongo.ObjectID(id);
  Person.collection.findOne({_id:_id}, function(err, obj){
    var person = changePrototype(obj);
    cb(person);
  });
};

Person.removeById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Person.collection.findAndRemove({_id:_id}, cb);
};


Person.prototype.save = function(cb){
  Person.collection.save(this, cb);
};

Person.prototype.addAsset = function(o){
  var asset = {name:o.name, photo:o.photo, count: parseInt(o.count), value: parseFloat(o.value), total: 0};
  asset.total = asset.count * asset.value;
  this.assets.push(asset);
};

Person.prototype.sellAsset = function(name){
  var assets = _.remove(this.assets, function(asset){return asset.name === name;});
  this.cash += assets[0].total;
};


//Helper Function

function changePrototype(obj){
  return _.create(Person.prototype, obj);
}

module.exports = Person;

