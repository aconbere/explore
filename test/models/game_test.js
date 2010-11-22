var minitest = require("minitest")
  , assert = require("assert")
  , sys = require("sys")
  , vows = require("vows")
  , Entity = require("../../app/models/entity").Entity
  , Game = require("../../app/models/game").Game
  , Ship = require("../../app/models/ship").Ship
  , Planet = require("../../app/models/planet").Planet
  , Vector = require("../../app/lib/vector").Vector

var suite = vows.describe("Game");

suite.addBatch({
  "A Game": {
    "randomly described": {
      topic: function () { return Game.randomMap(1000, 100) },

      "should create a world with 100 planets and 2 users": function (game) {
        // + 2 for each user
        assert.equal(Object.keys(game.entities).length, 100 + 2);
      },

      "register should register an entity": function (game) {
        var e = new Entity(undefined, 12121)
        e.x = "wtf";
        game.register(e);
        assert.equal(game.entities[e.guid].x, "wtf")
      },

      "getEntity should return an entity": function (game) {
        assert.ok(!game.getEntity("abcde"));
        assert.ok(game.getEntity(12121));
      },

      "dispath should set the pending action on an entity": function (game) {
        var action = { "entity": 12121
                     , "action": "blah"
                     , "args": ["test"]
                     };
        game.dispatch(action);
        assert.deepEqual({ "action": action.action, "args": action.args }, game.getEntity(12121).pendingAction);
      },

      "tick should update all entities with pending actions": function (game) {
        var e = game.getEntity(12121)
        var called = undefined;
        e.blah = function (args) {
          called = args
        }
        game.tick();
        assert.deepEqual(called, "test");
      },
    },
    "with some planets and a ship": {
      topic: function() {
        var game = new Game(10);
        var planet1 = new Planet(game, undefined, undefined, new Vector(1,1,1));
        var planet2 = new Planet(game, undefined, undefined, new Vector(5,5,1));
        var planet3 = new Planet(game, undefined, undefined, new Vector(10,10,10));
        var ship = new Ship(game, undefined, undefined, new Vector(0,0,0));

        return { game: game
               , planet1: planet1
               , planet2: planet2
               , planet3: planet3
               , ship: ship
               };
      },
      "Line of sight on a ship should return planet1": function(topic) {
        var entityList = topic.game.getLOS(topic.ship.guid);
        assert.equal(entityList.length, 1);
        assert.equal(entityList[0].guid, topic.planet1.guid);
      },

      "Line of sight on planet1 should return the ship and planet2": function (topic) {
        var entityList = topic.game.getLOS(topic.planet1.guid);
        assert.equal(entityList.length, 2);

        assert.equal(topic.planet2.guid, entityList.filter(function (e) {
          return e.guid == topic.planet2.guid
        })[0].guid);

        assert.equal(topic.ship.guid, entityList.filter(function (e) {
          return e.guid == topic.ship.guid
        })[0].guid);
      },

      "Line of sight on a planet3 should return no entity": function (topic) {
        var entityList = topic.game.getLOS(topic.planet3.guid);
        assert.equal(entityList.length, 0);
      }
    }
  }
}).export(module);
