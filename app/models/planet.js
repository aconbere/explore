var Mappable = require("./mappable").Mappable
  , Ship = require("./ship").Ship

var Planet = function () {
  Mappable.apply(this, arguments);
  this.radius = 2; 
  this.los = 5;
  this.type = "planet";
};

Planet.prototype = new Mappable();

Planet.prototype.build = function () {
  new Ship(this.game, undefined, this.owner, this.coordinates);
};

exports.Planet = Planet;
