var assert = require("assert")
  , Mappable = require("../../app/models/mappable").Mappable
  , User = require("../../app/models/user").User
  , Vector = require("../../app/lib/vector").Vector
  , GameMock = require("../mocks").GameMock
  , sys = require("sys")
  , vows = require("vows")

var suite = vows.describe("Entity");

suite.addBatch({
  "Mappable": {
    "with a game instance": {
      topic: function () {
        return new GameMock();
      },

      "with no user defined": {
        topic: function (game) {
          var coordinates = new Vector();
          var mappable = new Mappable(game, undefined, undefined, coordinates)
          return { coordinates: coordinates
                 , mappable: mappable
                 , game: game
                 };
        },

        "it should instantiate itself": function (topic) {
          assert.ok(topic.mappable.guid)
          assert.equal(topic.mappable.owner, topic.game.GAIA);
          assert.deepEqual(topic.mappable.coordinates, topic.coordinates);
        }
      },

      "with an owner defined": {
        topic: function (game) {
          var coordinates = new Vector();
          var user = new User(game);
          var mappable = new Mappable(game, undefined, user, coordinates)
          return { coordinates: coordinates
                 , mappable: mappable
                 , game: game
                 , owner: user
                 };
        },

        "it should instantiate itself": function (topic) {
          assert.ok(topic.mappable.guid)
          assert.deepEqual(topic.mappable.coordinates, topic.coordinates);
          assert.deepEqual(topic.mappable.owner, topic.owner);
        }
      },
    }
  }
}).export(module);
