var minitest = require("minitest")
  , assert = require("assert")
  , sys = require("sys")
  , Game = require("../../app/models/game").Game
  , Ship = require("../../app/models/ship").Ship
  , Vector = require("../../app/lib/vector").Vector


minitest.context("Game", function () { 
  this.setup(function () {
    this.game = Game.randomMap(1000, 100);
  });

  this.assertion("Creat a random world", function (test) {
    // Two extra for the GAIA and new user
    assert.equal(Object.keys(this.game.entities).length, 100 + 2);
    test.finished();
  });

  this.assertion("register should register an entity", function (test) {
    this.game.register({"guid": 12121, "x": "wtf"});
    assert.equal(this.game.entities[12121].x, "wtf");
    test.finished();
  });

  this.assertion("getEntity should correctly return an entity", function (test) {
    var startLength = Object.keys(this.game.entities).length;
    var coordinates = new Vector(0,1,2);
    var orientation = new Vector(2,1,0);
    var s = new Ship(this.game, undefined, undefined, coordinates, orientation);
    assert.equal(Object.keys(this.game.entities).length, startLength + 1);
    assert.deepEqual(this.game.getEntity(s.guid).coordinates, s.coordinates)
    test.finished();
  });

  this.assertion("dispatch should set the pending action on an entity", function (test) {
    var startLength = Object.keys(this.game.entities).length;
    var coordinates = new Vector(0,1,2);
    var orientation = new Vector(2,1,0);
    var s = new Ship(this.game, undefined, undefined, coordinates, orientation);
    var action = { "entity": s.guid
                 , "action": "blah"
                 , "args": ["test"]
                 };
    this.game.dispatch(action);
    assert.deepEqual({ "action": action.action, "args": action.args }, s.pendingAction);
    test.finished();
  });

  this.assertion("tick should update all the entities with pending actions ", function (test) {
    var startLength = Object.keys(this.game.entities).length;
    var coordinates = new Vector(0,1,2);
    var orientation = new Vector(2,1,0);
    var s = new Ship(this.game, undefined, undefined, coordinates, orientation);
    var action = { "entity": s.guid
                 , "action": "orient"
                 , "args": [new Vector (1,1,1)]
                 };
    this.game.dispatch(action);
    this.game.tick();
    test.finished();
  })
});

