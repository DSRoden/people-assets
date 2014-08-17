/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Person    = require('../../app/models/person'),
    dbConnect = require('../../app/lib/mongodb'),
    Mongo      = require('mongodb'),
    cp        = require('child_process'),
    db        = 'people';

describe('Person', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Person object', function(){
      var p = {name:'bob', photo: 'bob.png', cash:'100'},
          person = new Person(p);
      expect(person).to.be.instanceof(Person);
    });
  });

  describe('.all', function(){
    it('should get all people', function(done){
      Person.all(function(err, people){
        expect(people).to.have.length(2);
        done();
      });
    });
  });

  describe('.create', function(){
    it('should create a new person', function(done){
      Person.create({name:'bob', photo: 'bob.png', cash:'100'}, function(err, person){
        expect(person._id).to.be.instanceof(Mongo.ObjectID);
        expect(person.name).to.equal('bob');
        expect(person.photo).to.equal('bob.png');
        expect(person.cash).to.equal(100);
        expect(person.assets).to.have.length(0);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a person by id', function(done){
      Person.findById('000000000000000000000001', function(person){
        expect(person).to.be.instanceof(Person);
        expect(person.name).to.equal('Bart');
        done();
      });
    });
  });

  describe('.removeById', function(){
    it('should remove a person by id', function(done){
      Person.removeById('000000000000000000000001', function(person){
        Person.all(function(err, people){
          expect(people).to.have.length(1);
          done();
        });
      });
    });
  });

  describe('#save', function(){
    it('should save a person to db', function(done){
      var p = {name:'bob', photo: 'bob.png', cash:'100'},
          person = new Person(p);
      person.save(function(){
        Person.all(function(err, people){
          expect(people).to.have.length(3);
          done();
        });
      });
    });
  });
  describe('#addAsset', function(){
    it('should add an asset to a person', function(done){
      Person.findById('000000000000000000000002', function(person){
        person.addAsset({name:'hat', photo: 'hat.png', count: '2', value: '200'});
        expect(person.assets).to.have.length(3);
        done();
      });
    });
  });

  describe('#sellAsset', function(){
    it('should increase the cash of person when asset sells', function(done){
      Person.findById('000000000000000000000002', function(person){
        person.sellAsset('sax');
        expect(person.assets).to.have.length(1);
        expect(person.cash).to.equal(900);
        done();
      });
    });
  });
});

