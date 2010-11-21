var minitest = require("minitest")
  , assert = require("assert")
  , sys = require("sys")
  , vows = require("vows")
  , Entity = require("../../app/models/entity").Entity
  , Game = require("../../app/models/game").Game
  , Ship = require("../../app/models/ship").Ship
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
    }
  }
}).run();
