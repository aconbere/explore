var Entity = require("./entity").Entity

// @coordinates => [INT, INT]
var Mappable = function (guid, owner, coordinates) {
//  if (!coords || !coords.length) {
//    raise "Freak out";
//  }
  this.coordinates = coordinates;
  this.owner = owner || GAIA;
  Entity.call(this, arguments);
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

