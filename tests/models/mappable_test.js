var minitest = require("minitest");
var assert = require("assert");
var Mappable = require("../../app/models/mappable").Mappable;
var User = require("../../app/models/user").User;
var Vector = require("../../app/lib/vector").Vector;

minitest.context("Mappable", function () {
  this.assertion("Should instantiate itself", function (test) {
    var coordinates = new Vector();
    var m = new Mappable(undefined, undefined, coordinates);
    assert.ok(m.guid);
    assert.deepEqual(m.owner, User.GAIA);
    assert.deepEqual(m.coordinates, coordinates);

    var user = new User();
    var m2 = new Mappable(undefined, user, coordinates);
    assert.deepEqual(m2.owner, user);
    test.finished();
  });
});
