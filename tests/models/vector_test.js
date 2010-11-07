var minitest = require("minitest")
  , assert = require("assert")
  , Vector = require("../../app/lib/vector").Vector


minitest.context("Vector#dot", function () {
  this.setup(function () {
  });

  this.assertion("the 3 cardinal unit vectors should have magnitude 1 ", function (test) {
    var xv = new Vector(1, 0, 0);
    var yv = new Vector(0, 1, 0);
    var zv = new Vector(0, 0, 1);

    assert.equal(Math.sqrt(xv.dot(xv)), 1);
    assert.equal(Math.sqrt(yv.dot(yv)), 1);
    assert.equal(Math.sqrt(zv.dot(zv)), 1);
    test.finished();
  });

  this.assertion("the 3 cardinal unit vectors dotted with eachother should equal zero", function (test) {
    var xv = new Vector(1, 0, 0);
    var yv = new Vector(0, 1, 0);
    var zv = new Vector(0, 0, 1);

    assert.equal(xv.dot(yv), 0);
    assert.equal(yv.dot(zv), 0);
    assert.equal(zv.dot(xv), 0);

    test.finished();
  });
  
  this.assertion("compute a know dot product correctly", function (test) {
    var vec1 = new Vector(2,3,5);
    var vec2 = new Vector(1,4,6);

    assert.equal(vec1.dot(vec2), 44);
    test.finished();
  });

  
});

minitest.context("Vector#cross", function () {
  this.setup(function () {
  });

  this.assertion("X unit vector cross'ed with the Y unit vector should produce the Z unit vector", function (test) {
    var xv = new Vector(1, 0, 0);
    var yv = new Vector(0, 1, 0);
    var zv = new Vector(0, 0, 1);

    assert.deepEqual(xv.cross(yv), zv);
    assert.notDeepEqual(xv.cross(yv), xv);
    test.finished();
  });

  this.assertion("A vector cross'ed with itself results in a null vector", function (test) {
    var v = Vector.random();
    var nullV = new Vector();
    assert.deepEqual(v.cross(v), nullV);
    assert.notDeepEqual(v.cross(v), v);
    test.finished();
  });
});

minitest.context("Vector#multiply", function () {
  this.assertion("a random vector multiplied by a random scaler should be the composition of those components", function (test) {
    var s = Math.random();
    var v = Vector.random();
    var nv = v.multiply(s);

    assert.equal(nv.x, v.x * s);
    assert.equal(nv.y, v.y * s);
    assert.equal(nv.z, v.z * s);
    test.finished();
  });

  this.assertion("a random vector multiplied by zero should equal the null vector", function (test) {
    var v = Vector.random();
    assert.deepEqual(v.multiply(0), new Vector());
    test.finished();
  });

  this.assertion("a random vector multiplied by 1 should equal itself", function (test) {
    var v = Vector.random();
    assert.deepEqual(v.multiply(1), v);
    test.finished();
  });
});

minitest.context("Vector#add", function () {
  this.assertion("a random vector added to the null vector should equal itself", function (test) {
    var v = Vector.random();
    assert.deepEqual(v.add(new Vector()), v);
    test.finished();
  });

  this.assertion("a random vector added to itself should equal itself multiplied by two", function (test) {
    var v = Vector.random();
    assert.deepEqual(v.add(v), v.multiply(2));
    test.finished();
  });

  this.assertion("a random vector added to a random vector should be invertible ", function (test) {
    var v = Vector.random();
    var v2 = Vector.random();
    assert.deepEqual(v.add(v2), v2.add(v));
    test.finished();
  });
});

minitest.context("Vector#unit", function () {
  this.assertion("the magnitude of a unit vector should be 1", function (test) {
    var v = Vector.random();
    var delta = 0.00000000001
    var mag = v.unit().magnitude();
    assert.ok(mag + delta >= 1);
    assert.ok(mag - delta <= 1);
    test.finished();
  });
});
