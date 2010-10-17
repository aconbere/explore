var Map = function () {
};


// Returns a list of entities in line of site of the passed in entity.
// @entity -> Entity
Map.prototype.getEntities = function (entity) {
};

// get the state of a given entity
// @entity -> Entity -> { <state> }
Map.prototype.getResource = function (entity) {

};

// Planets -> returns a list of planets visable
// Ships -> results a list of planets visable
// Users -> returns a list of user owned resources
Map.prototype.getEntity = function (guid) {
  return this.entities[guid];
};

// emparts a list of actions on an entity
// @entity -> Entity
Map.prototype.direct = function (entity, actions)
  if (typeof actions === "Array") {
    actions.forEach(function (action) {
      if(entity[action]) {
        entity[action]();
      }
    }
  }
};

var GUID = function () {};

var Entity = function (guid) {
  this.guid = guid || new GUID();
};

Entity.prototype.update = function () {
  if (this.pendingAction) {
    this[this.pendingAction.action].call(this, this.pendingAction.args);
  }
};

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

// 
var Planet = function () {
  Mappable.call(this, arguments);
  this.parent = Mappable;
};
Planet.radius = 10;
Planet.prototype = new Mappable();

Planet.prototype.build = function () {
  new Ship(undefined, this.owner, this.coordinates);
};

// {"action": "orient", "args": [0,1]}
// {"action": "hold"}
// {"action": "colonize", "args": [<guid>]}
// @coordinates => [INT, INT]
// @orientation => [INT, INT]
var Ship = function (guid, owner, coordinates, orientation) {
  this.orientation = orientation || [0,0];
  Mappable.call(this, arguments);
};
Ship.velocity = 50;

Ship.prototype = new Mappable();

Ship.prototype.orient = function (coordinates) {
  this.orientation = this.unitVector(this.subtractVector(this.coordinates, coordinates));
  this.velocity = Ship.velocity;
};

Ship.prototype.hold = function () {
  this.velocity = 0;
};

Ship.prototype.colonize = function (planet) {
  this.velocity = 0;
  planet.owner = this.owner;
  this.owner.colonizing = true;
};

Ship.prototype.update = function () {
  Entity.prototype.update.call(this);
  this.coordinates = this.vecotorAdd(this.vectorMult(this.orientation, this.velocity), this.coordinates);
};

Ship.prototype.trace = function (planets) {
  .coordinates = this.unitVector(this.vectorMult(this.orientation, this.velocity), this.coordinates);
};

var User = function () {
  Entity.call(this, arguments);
};
User.prototype = new Entity();

var GAIA = new User();
