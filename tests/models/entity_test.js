var minitest = require("minitest")
  , assert = require("assert")
  , Entity = require("../../app/models/entity").Entity
  , GameMock = require("../mocks").GameMock

minitest.context("Entity", function () {
  this.setup(function () {
    this.game = new GameMock();
  });

  this.assertion("should register itself to the game instance", function (test) {
    var e = new Entity(this.game, "test");
    console.log("____________________")
    console.log(e);
    console.log("____________________")
    console.log(this.game.entities);
    assert.ok(this.game.entities["test"]);
  });

  this.assertion("Create instance with preset GUID", function (test) {
    var testGUID = "Test ID";
    var ent = new Entity(this.game, testGUID);

    assert.equal(ent.guid, testGUID);
    test.finished();
  });

  this.assertion("Create instance with random GUID", function (test) {
    var ent = new Entity(this.game);

    assert.ok(ent.guid);
    test.finished();
  });

  this.assertion("Verify type is entity", function (test) {
    var ent = new Entity(this.game);

    assert.equal(ent.type, "entity");
    test.finished();
  });

  this.assertion("Verify that the update method results in a no-op", function (test) {
    var ent = new Entity(this.game);
    var entS = ent.serialize();

    ent.update();
    
    assert.deepEqual(entS, ent.serialize());
    test.finished();
  });
});
