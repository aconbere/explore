var Entity = require("./entity").Entity
  , User = require("./user").User

// @coordinates => Vector
var Mappable = function (guid, owner, coordinates) {
  if (!coordinates) throw new Error("Coordinates are a required property of Mappable");
  this.coordinates = coordinates;
  this.owner = owner || User.GAIA;
  Entity.apply(this, arguments);
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
