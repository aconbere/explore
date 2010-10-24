var minitest = require("minitest");
var assert = require("assert");
var Entity = require("../../app/models/entity").Entity;

minitest.context("Entity", function () {
  this.assertion("Create instance with preset GUID", function (test) {
    var testGUID = "Test ID";
    var ent = new Entity(testGUID);

    assert.equal(ent.guid, testGUID);
    test.finished();
  });

  this.assertion("Create instance with random GUID", function (test) {
    var ent = new Entity();

    assert.ok(ent.guid);
    test.finished();
  });

  this.assertion("Verify type is entity", function (test) {
    var ent = new Entity();

    assert.equal(ent.type, "entity");
    test.finished();
  });

  this.assertion("Verify that the update method results in a no-op", function (test) {
    var ent = new Entity();
    var entS = ent.serialize();

    ent.update();
    
    assert.deepEqual(entS, ent.serialize());
    test.finished();
  });
});
