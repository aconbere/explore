var minitest = require("minitest")
  , assert = require("assert")
  , Mappable = require("../../app/models/mappable").Mappable
  , User = require("../../app/models/user").User
  , Vector = require("../../app/lib/vector").Vector
  , GameMock = require("../mocks").GameMock
  , sys = require("sys")

minitest.context("Mappable", function () {
  this.setup(function () {
    this.game = new GameMock();
  });

  this.assertion("Should instantiate itself", function (test) {
    this.game = new GameMock();
    var coordinates = new Vector();
    var m = new Mappable(this.game, undefined, undefined, coordinates);
    assert.ok(m.guid);
    assert.deepEqual(m.owner, this.game.GAIA);
    assert.deepEqual(m.coordinates, coordinates);

    var user = new User(this.game);
    var m2 = new Mappable(this.game, undefined, user, coordinates);
    assert.deepEqual(m2.owner, user);
    test.finished();
  });
});
