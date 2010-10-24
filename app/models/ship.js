var Mappable = require("./mappable").Mappable
  , Vector = require("../lib/vector").Vector

// {"action": "orient", "args": [0,1]}
// {"action": "hold"}
// {"action": "colonize", "args": [<guid>]}
// @coordinates => [INT, INT]
// @orientation => [INT, INT]
var Ship = function (guid, owner, coordinates, orientation) {
  this.orientation = orientation || new Vector(); 
  Mappable.apply(this, arguments);
};

Ship.velocity = 50;
Ship.losRadius = 50;

Ship.prototype = new Mappable();

Ship.prototype.serialize = function (losEntities) {
  var output = Mappable.prototype.call(this);
  output["orientation"] = this.orientation;
};

Ship.prototype.orient = function (coordinates) {
  this.orientation = this.coordinates.subtract(coordinates).unit();
  this.velocity = Ship.velocity;
};

Ship.prototype.hold = function () {
  this.velocity = 0;
};

// (can only colonize planets that it's at the coordinates of)
Ship.prototype.colonize = function (planet) {
  this.velocity = 0;
  if (this.coordinates.equals(planet.coordinates)) {
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
    this.coordinates = this.orientation.multiply(this.velocity).add(this.coordinates);
  }
};

// @planets => [entities] => entity
Ship.prototype.trace = function (planets) {
  //Entity.prototype.trace(this, this.line(), planets)
};

exports.Ship = Ship;
