var Mappable = require("./mappable").Mappable
  , Ship = require("./ship").Ship

var Planet = function () {
  Mappable.apply(this, arguments);
  this.radius = Planet.radius;
};
Planet.radius = 2;
Planet.losRadius = 50;

Planet.prototype = new Mappable();

Planet.prototype.build = function () {
  new Ship(this.game, undefined, this.owner, this.coordinates);
};

exports.Planet = Planet;
