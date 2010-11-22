var Entity = require("./entity").Entity
  , User = require("./user").User

// @coordinates => Vector
var Mappable = function (game, guid, owner, coordinates) {
  Entity.apply(this, arguments);
  this.coordinates = coordinates;
  if (this.game) {
    this.owner = owner || this.game.GAIA;
  }
  this.type = "mappable"
};

Mappable.prototype = new Entity();

// returns a list of entites filtered on the ships line of sight
Mappable.prototype.los = function (entities) {
  return [];
};

Mappable.prototype.serialize = function (entities) {
  var output = Entity.prototype.serialize.call(this);
  output["coordinates"] = this.coordinates;

  if (entities) {
    output["los"] = this.los(entities);
  }
  return output;
};

exports.Mappable = Mappable;
