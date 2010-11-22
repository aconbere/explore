var sys = require("sys")
  , User = require("./user").User
  , Planet = require("./planet").Planet
  , Vector = require("../lib/vector").Vector

var Game = function (worldSize, total) {
  this.worldSize = worldSize;
  this.total = total;
  this.entities = {};
  this.user = new User(this);
  this.GAIA = new User(this);
  this.turn = 0;
};

Game.randomMap = function (worldSize, total) {
  var game = new Game(worldSize, total);
  game.randomMap();
  return game;
};


Game.prototype.register = function (entity) {
  this.entities[entity.guid] = entity;
};

Game.prototype.randomMap = function () {
  for (var i = 0; i < this.total; i++) {
    var x = Math.floor(Math.random() * this.worldSize);
    var y = Math.floor(Math.random() * this.worldSize);
    var planet = new Planet(this, undefined, this.GAIA, new Vector(x, y, 0));
    this.register(planet); 
  }
};

Game.prototype.start = function () {
  this.entities[Object.keys(this.entities)[0]].owner = this.user;
};

Game.prototype.entityValues = function () {
  var that = this;
  return Object.keys(this.entities).map(function (guid) {
    return that.getEntity(guid);
  });
}

Game.prototype.tick = function () {
  var that = this;
  sys.puts("starting new tick");
  this.entityValues().forEach(function (e) {
    e.update(that)
  });
  this.turn++;
};

Game.prototype.planets = function () {
  var that = this;
  this.entityValues().filter(function (entity) {
    return entity.type === "planet";
  });
};

// LINE OF SIGHT
// Planets -> returns a list of planets visable
// Ships -> results a list of planets visable
// Users -> returns a list of user owned resources
//
Game.prototype.getLOS = function (guid) {
  var entity  = this.getEntity(guid);

  return this.entityValues().filter(function (e) {
    if (e.coordinates) {
      return (e.guid != entity.guid) && e.coordinates.subtract(entity.coordinates).magnitude() < (entity.los + e.radius);
    }
  });
};

Game.prototype.getEntity = function (guid) {
  return this.entities[guid];
};

// queues an action on an entity
// {entity: <guid>, "action": <action>, "args": <args>}
Game.prototype.dispatch = function (command)  {
  var entity = this.getEntity(command.entity);
  if (entity) {
    entity.pendingAction = {"action": command.action, "args": command.args};
    return true;
  }
  return false;
}

Game.prototype.serialize = function ()  {
  return { "type": "game"
         , "turn": this.turn
         , "worldSize": this.worldSize
         , "total": this.total
         }
};

Game.prototype.query = function (guid)  {
  if (guid == "game") {
    return this.serialize();
  }
  var entity = this.getEntities(guid)
  return entity.serialize(this.entities);
}

exports.Game = Game;
