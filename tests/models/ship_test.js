var minitest = require("minitest"),
    sys = require("sys"),
    assert = require("assert"),
    Ship = require("../../app/models/ship").Ship,
    Vector = require("../../app/lib/vector").Vector,
    User = require("../../app/models/user").User
    Planet = require("../../app/models/planet").Planet

minitest.context("Ship", function () {
  this.assertion("Should instantiate itself", function (test) {
    var coordinates = new Vector(0,1,2);
    var orientation = new Vector(2,1,0);
    var s = new Ship(undefined, undefined, coordinates, orientation);
    assert.equal(coordinates, s.coordinates)
    assert.equal(orientation, s.orientation)
    assert.equal(0, s.speed)
    assert.deepEqual(s.owner, User.GAIA);
    test.finished();
  });

  this.assertion("orient should give the ship a new direction and set the ship speed", function (test) {
    var coordinates = new Vector(0,1,2);
    var orientation = new Vector(2,1,0);
    var newDirection = new Vector(1,1,0);
    var s = new Ship(undefined, undefined, coordinates, orientation);
    s.orient(newDirection);
    assert.equal(Ship.speed, s.speed);
    assert.deepEqual(newDirection.subtract(coordinates).unit(), s.orientation);
    test.finished();
  });

  this.assertion("hold should give the ship speed zero", function (test) {
    var coordinates = new Vector(0,1,2);
    var s = new Ship(undefined, undefined, coordinates, undefined);
    s.speed = Ship.speed;
    s.hold();
    assert.equal(0, s.speed);
    test.finished();
  });

  this.assertion("colonize should only run on a planet if the ship's coordinates equal the planets cooordinates", function (test) {
    var coordinates = new Vector(0,1,2);
    var coordinatesShared = new Vector(3, 4, 5);

    var u = new User();
    var s = new Ship(undefined, u, coordinates, undefined);
    s.speed = Ship.speed;
    var s2 = new Ship(undefined, u, coordinatesShared, undefined);
    var p = new Planet(undefined, undefined, coordinatesShared, undefined);

    s.colonize(p);
    assert.equal(Ship.speed, s.speed);
    assert.deepEqual(p.owner, User.GAIA);
    assert.ok(!u.colonizing);

    s2.colonize(p);
    assert.equal(0, s2.speed);
    assert.deepEqual(p.owner, u);
    assert.ok(u.colonizing);

    test.finished();
  });

  this.assertion("update should set the ship's coordinates to the coordinates of an intersected planet", function (test) {
    var p = new Planet(undefined, undefined, new Vector(20,0,0)); 
    var gameStateMock = { planets: function () { return [p] } };

    var coordinates = new Vector(0,0,0);
    var orientation = new Vector(1,0,0);
    var s = new Ship(undefined, undefined, coordinates);
    s.orient(orientation);
    s.update(gameStateMock)

    assert.equal(s.coordinates, p.coordinates);
    test.finished();
  });

  this.assertion("update should move the ship, if no planet is intersected", function (test) {
    var gameStateMock = { planets: function () { return [] } };

    var coordinates = new Vector(0,0,0);
    var orientation = new Vector(1,0,0);
    var s = new Ship(undefined, undefined, coordinates);
    s.orient(orientation);
    s.update(gameStateMock);

    assert.equal(s.coordinates.x, 50);
    test.finished();
  });

  this.assertion("trace should return a planet if our ship intersects it's sphere", function (test) {
    var coordinates = new Vector(0,0,0);
    var orientation = new Vector(1,0,0);
    var s = new Ship(undefined, undefined, coordinates);
    s.orient(orientation);

    var coordinatesp = new Vector(20,0,0);
    var coordinatesp2 = new Vector(21,0,0);
    var coordinatesp3 = new Vector(55,0,0);
    var coordinatesp4 = new Vector(-8,0,0);
    var p = new Planet(undefined, undefined, coordinatesp); 
    var p2 = new Planet(undefined, undefined, coordinatesp2); 
    var p3 = new Planet(undefined, undefined, coordinatesp3); 
    var p4 = new Planet(undefined, undefined, coordinatesp4); 

    assert.deepEqual(s.trace([p, p2, p3, p4]), p);
    assert.deepEqual(s.trace([p2, p, p3, p4]), p);
    assert.deepEqual(s.trace([p3]), undefined);
    assert.deepEqual(s.trace([p4]), undefined);
    test.finished();
  });

  this.assertion("intersectSphere should return true when a line intersects a sphere", function (test) {
    var s = new Ship();
    var p1 = new Vector(0,0,0);
    var p2 = new Vector(50,0,0);

    var center = new Vector(20,0,0);
    var radius = 5;

    assert.notEqual(s.intersectSphere(p1, p2, center, radius), null);

    var center = new Vector(20,1,0);
    var radius = 5;

    assert.notEqual(s.intersectSphere(p1, p2, center, radius), null);

    var center = new Vector(51,0,0);
    var radius = 5;

    assert.notEqual(s.intersectSphere(p1, p2, center, radius), null);

    var center = new Vector(55,0,0);
    var radius = 5;

    assert.notEqual(s.intersectSphere(p1, p2, center, radius), null);

    // make sure we're dealing with a line segment
    var center = new Vector(56,0,0);
    var radius = 5;

    assert.ok(s.intersectSphere(p1, p2, center, radius) > 1);

    var center = new Vector(-6,0,0);
    var radius = 5;

    assert.ok(s.intersectSphere(p1, p2, center, radius) < 0);

    test.finished();
  });
});
