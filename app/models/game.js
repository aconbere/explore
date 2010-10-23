var sys = require("sys")
  , User = require("./user").User;

var GAIA = new User();

var Game = function (worldSize, total) {
  this.worldSize = worldSize;
  this.total = total;
  this.user = new User();
  this.turn = 0;
};

Game.randomMap = function (worldSize, total) {
  var game = new Game(worldSize, total);
  game.entities = game.randomMap();
};

Game.prototype.randomMap = function () {
  var entities = {};
  
  for (var i = 0; i < total; i++) {
    var x = Math.floor(Math.random * this.worldSize);
    var y = Math.floor(Math.random * this.worldSize);
    var planet = Planet(undefined, GAIA, [x, y]);
    entities[planet.guid] = planet; 
  }
  return entities;
};

Game.prototype.start = function () {
  this.entities[Object.keys(this.entities)[0]].owner = this.user;
};

Game.prototype.tick = function () {
  var that = this;
  sys.puts("starting new tick");
  Object.keys(this.entities).forEach(function (guid) {
    that.getEntity(guid).update();
  });
  this.turn++;
};

// LINE OF SIGHT
// Planets -> returns a list of planets visable
// Ships -> results a list of planets visable
// Users -> returns a list of user owned resources
Game.prototype.getEntity = function (guid) {
  return this.entities[guid];
};

// queues an action on an entity
// {entity: <guid>, "action": <action>, "args": <args>}
Game.prototype.dispatch = function (command)  {
  var entity = this.getEntity(command.guid);
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
         }
};

Game.prototype.query = function (guid)  {
  if (guid == "game") {
    return this.serialize();
  }
  var entity = this.getEntities(guid)
  return entity.serialize(this.entities);
}
