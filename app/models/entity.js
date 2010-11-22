var GUID = require("./guid").GUID
  , sys = require("sys")

var Entity = function (game, guid) {
  // only does its business if game is passed in
  // this allows us to use Entity as a prototype constructor
  this.guid = guid || GUID();
  this.register(game);
  this.type = "entity";
  this.radius = 0;
  this.los = 0;
};

Entity.prototype.update = function (gameState) {
  if (this.pendingAction) {
    if (!this[this.pendingAction.action])
      throw "Unknown Action"
    this[this.pendingAction.action].apply(this, this.pendingAction.args);
    delete this.pendingAction
  }
};

Entity.prototype.register = function (game) {
  if (game) {
    this.game = game;
    this.game.register(this);
  }
};

Entity.prototype.serialize = function () {
  var output = { "guid": this.guid
               , "type": this.type
               }
  return output;
};

exports.Entity = Entity;
