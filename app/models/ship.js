var Mappable = require("./mappable").Mappable
  , Vector = require("../lib/vector").Vector
  , Entity = require("./entity").Entity

// {"action": "orient", "args": [0,1]}
// {"action": "hold"}
// {"action": "colonize", "args": [<guid>]}
// @coordinates => [INT, INT]
// @orientation => [INT, INT]
var Ship = function (game, guid, owner, coordinates, orientation) {
  Mappable.apply(this, arguments);
  this.orientation = orientation || new Vector(); 
  this.speed = 0;
};

Ship.speed = 50;
Ship.losRadius = 50;

Ship.prototype = new Mappable();

Ship.prototype.serialize = function (losEntities) {
  var output = Mappable.prototype.call(this);
  output["orientation"] = this.orientation;
};

Ship.prototype.orient = function (coordinates) {
  console.log(coordinates);
  this.orientation = coordinates.subtract(this.coordinates).unit();
  // resets ship speed to global speed of ships
  // orient always implies movement next turn
  this.speed = Ship.speed;
};

Ship.prototype.hold = function () {
  this.speed = 0;
};

// (can only colonize planets that it's at the coordinates of)
Ship.prototype.colonize = function (planet) {
  if (this.coordinates.equals(planet.coordinates)) {
    this.hold();
    planet.owner = this.owner;
    this.owner.colonizing = true;
  }
};

Ship.prototype.update = function (gameState) {
  Entity.prototype.update.call(this);
  var planet = this.trace(gameState.planets());
  if (planet) {
    this.coordinates = planet.coordinates;
  } else {
    this.coordinates = this.orientation.multiply(this.speed).add(this.coordinates);
  }
};

// @planets => [entities] => entity
Ship.prototype.trace = function (planets) {
  var that = this;
  return planets.reduce(function (acc, i) {
    var t = that.intersectSphere( that.coordinates
                                , that.coordinates.add(that.orientation.multiply(that.speed))
                                , i.coordinates
                                , i.radius);
    if (t && t >= 0 && t <= 1) {
      acc.push([t, i]);
    }
    return acc;
  }, []).sort(function (tp1, tp2) {
    return tp1[0] - tp2[0];
  }).map(function (tp) {
    return tp[1];
  })[0];
};

Ship.prototype.intersectSphere = function (p1, p2, center, radius) {
  var _p3 = (p1.subtract(p2))
  var a = _p3.dot(_p3);
  var b = 2 * (p2.subtract(p1).dot(p1.subtract(center)));
  var c = center.dot(center) + p1.dot(p1) - (2 * center.dot(p1)) - Math.pow(radius, 2)

  var determ = Math.pow(b, 2) - (4 * a * c);

  if (determ >= 0) {
    var t1 = ((b * -1) + Math.sqrt(determ)) / (2 * a);
    var t2 = ((b * -1) - Math.sqrt(determ)) / (2 * a);

    if (t1 < 0 || t2 < 0) {
      return (t1 > 0) ? t1 : t2;
    } else {
      return (t1 < t2) ? t1 : t2;
    }
  }
  return null;
};

exports.Ship = Ship;
