var vows = require("vows")
  , sys = require("sys")
  , assert = require("assert")
  , Ship = require("../../app/models/ship").Ship
  , Vector = require("../../app/lib/vector").Vector
  , User = require("../../app/models/user").User
  , Planet = require("../../app/models/planet").Planet
  , GameMock = require("../mocks").GameMock


var suite = vows.describe("Entity");

suite.addBatch({
  "A Ship": {
    "with a game instance": {
      topic: function () {
        game = new GameMock();
        coordinates = new Vector(0,1,2);
        orientation = new Vector(2,1,0);
        user = new User(game);
        ship = new Ship(game, undefined, user, coordinates, orientation);

        return { ship: ship
               , game: game
               , coordinates: coordinates
               , orientation: orientation
               , user: user
               }
      },

      "it should instantiate itself": function (topic) {
        assert.equal(topic.coordinates, topic.ship.coordinates)
        assert.equal(topic.orientation, topic.ship.orientation)
        assert.equal(0, topic.ship.speed)
        assert.deepEqual(topic.ship.owner, topic.user);
      },

      "orient should give the ship a new direction and set the ship speed": function (topic) {
        var newDirection = new Vector(1,1,0);
        topic.ship.orient(newDirection);
        assert.equal(topic.ship.speed, 50);
        assert.deepEqual(newDirection.subtract(topic.coordinates).unit(), ship.orientation);
      },

      "hold should give the ship speed zero": function (topic) {
        topic.ship.hold();
        assert.equal(ship.speed, 0);
      },

      "on a planet": {
        topic: function (topic) {
          topic.planet1 = new Planet(topic.game, undefined, undefined, new Vector(), undefined);
          topic.planet2 = new Planet(topic.game, undefined, undefined, ship.coordinates, undefined);
          return topic;
        },

        "colonize should only run on a planet if the ships coordinates equal the planets coordinates": function (topic) {
          topic.ship.speed = 50;
          topic.ship.colonize(topic.planet1);
          assert.equal(topic.ship.speed, 50);
          assert.deepEqual(topic.planet1.owner, topic.game.GAIA);
          assert.ok(!topic.user.colonizing);

          topic.ship.colonize(topic.planet2);
          assert.equal(topic.ship.speed, 0);
          assert.deepEqual(topic.planet2.owner, topic.ship.owner);
          assert.ok(topic.user.colonizing);
        }
      }
    }
  }
}).export(module);
