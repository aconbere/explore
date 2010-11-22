var assert = require("assert")
  , Entity = require("../../app/models/entity").Entity
  , GameMock = require("../mocks").GameMock
  , vows = require("vows")

var suite = vows.describe("Entity");

suite.addBatch({
  "An Entity": {
    "with a game instance": {
      topic: new GameMock(),

      "with a preset GUID": {
        topic: function (game) {
          return new Entity(game, "test")
        },

        "should preserve the value of the GUID": function (entity) {
          assert.equal(entity.guid, "test")
        }
      },

      "with a game built GUID": {
        topic: function (game) {
          return new Entity(game);
        },

        "should have a guid": function (entity) {
          assert.ok(entity.guid);
        },
        
        "should have type \"entity\"": function (entity) {
          assert.equal(entity.type, "entity");
        },

        "should not change if no pendingAction is set and update is called": function (entity) {
          var entS = entity.serialize()
          entity.update()
          assert.deepEqual(entS, entity.serialize());
        }
      },

      "should register itself to the game instance": function (game) {
        new Entity(game, "test")
        assert.ok(game.entities["test"]);
      }
    }
  }
}).export(module)
