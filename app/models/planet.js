var Mappable = require("./mappable").Mappable
  , Ship = require("./ship").Ship;

var Planet = function () {
  Mappable.apply(this, arguments);
  this.parent = Mappable;
};
Planet.radius = 10;
Planet.losRadius = 50;

Planet.prototype = new Mappable();

Planet.prototype.build = function () {
  new Ship(undefined, this.owner, this.coordinates);
};

exports.Planet = Planet;
